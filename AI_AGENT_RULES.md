# 🤖 AI Agent Development Rules

> **Mission**: Build intelligent, reliable, and maintainable AI agents that enhance the Sumbandila platform.

---

## 📋 Table of Contents

- [Agent Architecture Standards](#agent-architecture-standards)
- [Prompt Engineering Guidelines](#prompt-engineering-guidelines)
- [Memory Management](#memory-management)
- [Tool Integration](#tool-integration)
- [Error Handling](#error-handling)
- [Testing AI Agents](#testing-ai-agents)
- [Observability](#observability)

---

## 🏗️ Agent Architecture Standards

### Core Components

Every AI agent must implement:

```python
from typing import List, Dict, Any, Optional
from pydantic import BaseModel

class AgentConfig(BaseModel):
    """Agent configuration."""
    name: str
    model: str = "gpt-4"
    temperature: float = 0.7
    max_tokens: int = 2000
    system_prompt: str
    tools: List[str] = []

class AgentMemory(BaseModel):
    """Agent memory structure."""
    short_term: List[Dict[str, Any]] = []
    long_term: Dict[str, Any] = {}
    context_window: int = 10

class Agent:
    """Base AI Agent class."""
    
    def __init__(self, config: AgentConfig):
        self.config = config
        self.memory = AgentMemory()
        self.tools = self._load_tools()
    
    async def execute(self, task: str) -> Dict[str, Any]:
        """Execute agent task with memory and tools."""
        # 1. Load relevant memory
        context = self._build_context(task)
        
        # 2. Execute with LLM
        response = await self._call_llm(task, context)
        
        # 3. Use tools if needed
        if response.requires_tool:
            tool_result = await self._execute_tool(response.tool_call)
            response = await self._call_llm(task, context, tool_result)
        
        # 4. Update memory
        self._update_memory(task, response)
        
        # 5. Return result
        return response
    
    def _build_context(self, task: str) -> str:
        """Build context from memory."""
        relevant_memories = self._retrieve_relevant_memories(task)
        return "\n".join(relevant_memories)
    
    async def _call_llm(self, task: str, context: str, tool_result: Optional[str] = None) -> Dict:
        """Call LLM with context."""
        messages = [
            {"role": "system", "content": self.config.system_prompt},
            {"role": "user", "content": f"Context: {context}\n\nTask: {task}"}
        ]
        
        if tool_result:
            messages.append({"role": "assistant", "content": tool_result})
        
        response = await openai.ChatCompletion.acreate(
            model=self.config.model,
            messages=messages,
            temperature=self.config.temperature,
            max_tokens=self.config.max_tokens
        )
        
        return response
    
    async def _execute_tool(self, tool_call: Dict) -> str:
        """Execute tool and return result."""
        tool = self.tools[tool_call["name"]]
        result = await tool.execute(tool_call["arguments"])
        return result
    
    def _update_memory(self, task: str, response: Dict):
        """Update agent memory."""
        self.memory.short_term.append({
            "task": task,
            "response": response,
            "timestamp": datetime.now().isoformat()
        })
        
        # Keep only last N items in short-term memory
        if len(self.memory.short_term) > self.memory.context_window:
            self.memory.short_term.pop(0)
```

---

## 📝 Prompt Engineering Guidelines

### System Prompt Structure

```python
SYSTEM_PROMPT_TEMPLATE = """
You are {agent_name}, an AI assistant specialized in {domain}.

## Your Role
{role_description}

## Your Capabilities
{capabilities}

## Your Constraints
{constraints}

## Response Format
{response_format}

## Examples
{examples}
"""

# Example: Verification Agent
VERIFICATION_AGENT_PROMPT = """
You are Sumbandila Verification Agent, an AI assistant specialized in verifying South African institutions and professionals.

## Your Role
You help users verify the legitimacy of educational institutions, healthcare professionals, and legal practitioners by querying trusted government registries.

## Your Capabilities
- Query DHET, CHE, SAQA for educational institutions
- Query HPCSA for healthcare professionals
- Query LPC, GCB for legal practitioners
- Calculate trust scores based on verification results
- Detect fraud signals and risk indicators
- Provide multilingual responses (English, isiZulu, Afrikaans, Sepedi, Xitsonga)

## Your Constraints
- Only provide information from verified registries
- Never fabricate or guess verification status
- Always cite the authority source (e.g., "According to HPCSA...")
- Flag uncertain results clearly
- Respect user privacy (hash IP addresses)

## Response Format
Always respond with:
1. Verification status (Verified/Not Found/Deregistered)
2. Trust score (0-100)
3. Authority source
4. Risk signals (if any)
5. Blockchain hash for verification

## Examples
User: "Is Dr Jane Smith a registered doctor?"
Assistant: "✅ Verified & Registered

Dr Jane Smith is a registered medical practitioner with HPCSA.
- Registration Number: MP123456
- Specialisation: General Practitioner
- Status: Practising
- Trust Score: 96/100
- Risk Level: LOW — Appears Legitimate
- Blockchain Hash: 0x7f92e3a1b8c4d2e6f0a9b3c5

Source: HPCSA Registry (Last Updated: 2026-05-22)"
"""
```

### Prompt Best Practices

1. **Be Specific**: Clear role and constraints
2. **Provide Examples**: Few-shot learning improves accuracy
3. **Define Format**: Structured outputs are easier to parse
4. **Set Boundaries**: Explicit constraints prevent hallucinations
5. **Include Context**: Relevant background information

---

## 🧠 Memory Management

### Short-Term Memory (Conversation Context)

```python
class ShortTermMemory:
    """Manages conversation context."""
    
    def __init__(self, max_messages: int = 10):
        self.messages: List[Dict] = []
        self.max_messages = max_messages
    
    def add(self, role: str, content: str):
        """Add message to memory."""
        self.messages.append({
            "role": role,
            "content": content,
            "timestamp": datetime.now().isoformat()
        })
        
        # Trim old messages
        if len(self.messages) > self.max_messages:
            self.messages = self.messages[-self.max_messages:]
    
    def get_context(self) -> List[Dict]:
        """Get conversation context."""
        return self.messages
```

### Long-Term Memory (Vector Store)

```python
from langchain.vectorstores import Chroma
from langchain.embeddings import OpenAIEmbeddings

class LongTermMemory:
    """Manages persistent agent memory using vector store."""
    
    def __init__(self, agent_id: str):
        self.agent_id = agent_id
        self.embeddings = OpenAIEmbeddings()
        self.vectorstore = Chroma(
            collection_name=f"agent_{agent_id}_memory",
            embedding_function=self.embeddings
        )
    
    async def store(self, content: str, metadata: Dict):
        """Store memory with embeddings."""
        await self.vectorstore.aadd_texts(
            texts=[content],
            metadatas=[{
                **metadata,
                "agent_id": self.agent_id,
                "timestamp": datetime.now().isoformat()
            }]
        )
    
    async def retrieve(self, query: str, k: int = 5) -> List[str]:
        """Retrieve relevant memories."""
        results = await self.vectorstore.asimilarity_search(query, k=k)
        return [doc.page_content for doc in results]
```

---

## 🛠️ Tool Integration

### Tool Definition

```python
from typing import Callable, Dict, Any
from pydantic import BaseModel, Field

class ToolParameter(BaseModel):
    """Tool parameter definition."""
    name: str
    type: str
    description: str
    required: bool = True

class Tool(BaseModel):
    """AI Agent tool definition."""
    name: str
    description: str
    parameters: List[ToolParameter]
    function: Callable
    
    async def execute(self, arguments: Dict[str, Any]) -> str:
        """Execute tool with arguments."""
        try:
            result = await self.function(**arguments)
            return json.dumps(result)
        except Exception as e:
            return json.dumps({"error": str(e)})

# Example: Database Query Tool
async def query_database(query: str, entity_type: str) -> Dict:
    """Query database for entity verification."""
    if entity_type == "institution":
        result = await db.query(Institution).filter(
            Institution.name.ilike(f"%{query}%")
        ).first()
    elif entity_type == "professional":
        result = await db.query(Professional).filter(
            Professional.name.ilike(f"%{query}%")
        ).first()
    else:
        raise ValueError(f"Unknown entity type: {entity_type}")
    
    return result.dict() if result else {"error": "Not found"}

database_tool = Tool(
    name="query_database",
    description="Query the verification database for institutions or professionals",
    parameters=[
        ToolParameter(name="query", type="string", description="Search query"),
        ToolParameter(name="entity_type", type="string", description="Type: 'institution' or 'professional'")
    ],
    function=query_database
)
```

### Tool Execution Flow

```
1. LLM determines tool is needed
2. LLM generates tool call with arguments
3. Agent validates tool call
4. Agent executes tool
5. Agent passes result back to LLM
6. LLM generates final response
```

---

## ⚠️ Error Handling

### Graceful Degradation

```python
class AgentError(Exception):
    """Base agent error."""
    pass

class LLMError(AgentError):
    """LLM API error."""
    pass

class ToolError(AgentError):
    """Tool execution error."""
    pass

async def execute_with_fallback(agent: Agent, task: str) -> Dict:
    """Execute agent with fallback strategies."""
    try:
        # Try primary model
        return await agent.execute(task)
    except LLMError as e:
        logger.warning(f"Primary model failed: {e}")
        
        try:
            # Fallback to secondary model
            agent.config.model = "gpt-3.5-turbo"
            return await agent.execute(task)
        except LLMError as e:
            logger.error(f"Secondary model failed: {e}")
            
            # Return graceful error response
            return {
                "status": "error",
                "message": "AI service temporarily unavailable. Please try again.",
                "fallback": True
            }
```

### Retry Logic

```python
from tenacity import retry, stop_after_attempt, wait_exponential

@retry(
    stop=stop_after_attempt(3),
    wait=wait_exponential(multiplier=1, min=2, max=10)
)
async def call_llm_with_retry(messages: List[Dict]) -> Dict:
    """Call LLM with exponential backoff retry."""
    response = await openai.ChatCompletion.acreate(
        model="gpt-4",
        messages=messages
    )
    return response
```

---

## 🧪 Testing AI Agents

### Unit Tests

```python
import pytest
from unittest.mock import AsyncMock, patch

@pytest.mark.asyncio
async def test_agent_verification():
    """Test agent verification flow."""
    # Arrange
    agent = Agent(AgentConfig(
        name="test_agent",
        system_prompt="You are a test agent"
    ))
    
    mock_llm_response = {
        "choices": [{
            "message": {
                "content": "Verified: Dr Jane Smith is registered with HPCSA"
            }
        }]
    }
    
    # Act
    with patch('openai.ChatCompletion.acreate', return_value=mock_llm_response):
        result = await agent.execute("Verify Dr Jane Smith")
    
    # Assert
    assert "Verified" in result["choices"][0]["message"]["content"]
    assert "HPCSA" in result["choices"][0]["message"]["content"]
```

### Integration Tests

```python
@pytest.mark.asyncio
async def test_agent_with_database_tool():
    """Test agent with real database tool."""
    # Arrange
    agent = Agent(AgentConfig(
        name="verification_agent",
        system_prompt=VERIFICATION_AGENT_PROMPT,
        tools=["query_database"]
    ))
    
    # Act
    result = await agent.execute("Is Dr Jane Smith a registered doctor?")
    
    # Assert
    assert result["status"] == "success"
    assert "trust_score" in result
    assert result["trust_score"] > 0
```

### Evaluation Metrics

```python
class AgentEvaluator:
    """Evaluate agent performance."""
    
    async def evaluate(self, agent: Agent, test_cases: List[Dict]) -> Dict:
        """Run evaluation on test cases."""
        results = {
            "accuracy": 0,
            "response_time": [],
            "error_rate": 0,
            "hallucination_rate": 0
        }
        
        for test_case in test_cases:
            start_time = time.time()
            
            try:
                response = await agent.execute(test_case["input"])
                response_time = time.time() - start_time
                
                # Check accuracy
                if self._is_correct(response, test_case["expected"]):
                    results["accuracy"] += 1
                
                # Check for hallucinations
                if self._contains_hallucination(response, test_case["facts"]):
                    results["hallucination_rate"] += 1
                
                results["response_time"].append(response_time)
                
            except Exception as e:
                results["error_rate"] += 1
                logger.error(f"Evaluation error: {e}")
        
        # Calculate percentages
        total = len(test_cases)
        results["accuracy"] = (results["accuracy"] / total) * 100
        results["error_rate"] = (results["error_rate"] / total) * 100
        results["hallucination_rate"] = (results["hallucination_rate"] / total) * 100
        results["avg_response_time"] = sum(results["response_time"]) / len(results["response_time"])
        
        return results
```

---

## 📊 Observability

### Logging

```python
import structlog

logger = structlog.get_logger()

async def execute_with_logging(agent: Agent, task: str) -> Dict:
    """Execute agent with structured logging."""
    logger.info(
        "agent_execution_started",
        agent_name=agent.config.name,
        task=task,
        model=agent.config.model
    )
    
    try:
        result = await agent.execute(task)
        
        logger.info(
            "agent_execution_completed",
            agent_name=agent.config.name,
            task=task,
            response_length=len(str(result)),
            tokens_used=result.get("usage", {}).get("total_tokens", 0)
        )
        
        return result
        
    except Exception as e:
        logger.error(
            "agent_execution_failed",
            agent_name=agent.config.name,
            task=task,
            error=str(e),
            exc_info=True
        )
        raise
```

### Tracing

```python
from opentelemetry import trace

tracer = trace.get_tracer(__name__)

async def execute_with_tracing(agent: Agent, task: str) -> Dict:
    """Execute agent with OpenTelemetry tracing."""
    with tracer.start_as_current_span("agent_execution") as span:
        span.set_attribute("agent.name", agent.config.name)
        span.set_attribute("agent.model", agent.config.model)
        span.set_attribute("task", task)
        
        with tracer.start_as_current_span("build_context"):
            context = agent._build_context(task)
        
        with tracer.start_as_current_span("llm_call"):
            response = await agent._call_llm(task, context)
            span.set_attribute("tokens_used", response.get("usage", {}).get("total_tokens", 0))
        
        with tracer.start_as_current_span("update_memory"):
            agent._update_memory(task, response)
        
        return response
```

### Metrics

```python
from prometheus_client import Counter, Histogram

# Define metrics
agent_requests = Counter(
    'agent_requests_total',
    'Total agent requests',
    ['agent_name', 'status']
)

agent_response_time = Histogram(
    'agent_response_time_seconds',
    'Agent response time',
    ['agent_name']
)

agent_tokens_used = Histogram(
    'agent_tokens_used',
    'Tokens used per request',
    ['agent_name', 'model']
)

async def execute_with_metrics(agent: Agent, task: str) -> Dict:
    """Execute agent with Prometheus metrics."""
    start_time = time.time()
    
    try:
        result = await agent.execute(task)
        
        # Record metrics
        agent_requests.labels(
            agent_name=agent.config.name,
            status='success'
        ).inc()
        
        agent_response_time.labels(
            agent_name=agent.config.name
        ).observe(time.time() - start_time)
        
        agent_tokens_used.labels(
            agent_name=agent.config.name,
            model=agent.config.model
        ).observe(result.get("usage", {}).get("total_tokens", 0))
        
        return result
        
    except Exception as e:
        agent_requests.labels(
            agent_name=agent.config.name,
            status='error'
        ).inc()
        raise
```

---

## 🎯 Best Practices

### 1. **Prompt Versioning**

```python
PROMPT_VERSIONS = {
    "v1": "You are a verification agent...",
    "v2": "You are Sumbandila Verification Agent...",
    "v3": "You are Sumbandila Verification Agent, specialized in..."
}

agent = Agent(AgentConfig(
    system_prompt=PROMPT_VERSIONS["v3"]
))
```

### 2. **Cost Optimization**

```python
# Use cheaper models for simple tasks
if task_complexity == "simple":
    agent.config.model = "gpt-3.5-turbo"
else:
    agent.config.model = "gpt-4"

# Cache common responses
@cache(ttl=3600)
async def get_agent_response(task: str) -> Dict:
    return await agent.execute(task)
```

### 3. **Safety Guardrails**

```python
def validate_response(response: str) -> bool:
    """Validate agent response for safety."""
    # Check for PII leakage
    if contains_pii(response):
        logger.warning("Response contains PII")
        return False
    
    # Check for hallucinations
    if contains_unverified_claims(response):
        logger.warning("Response contains unverified claims")
        return False
    
    return True
```

---

**Last Updated**: 2026-05-22  
**Version**: 1.0.0  
**Maintained By**: Sumbandila AI Team
