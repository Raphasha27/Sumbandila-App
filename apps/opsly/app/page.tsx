export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1220] text-white flex flex-col items-center">
      
      {/* Limited Time Offer Banner */}
      <div className="w-full bg-blue-600/20 border-b border-blue-500/30 py-2 px-4 text-center text-sm font-medium text-blue-300">
        🚀 Limited Offer: First 50 teams get **Lifetime Pro Access**. Only 38 slots left.
      </div>

      {/* Navigation */}
      <nav className="w-full max-w-7xl px-8 py-6 flex justify-between items-center">
        <div className="text-2xl font-bold tracking-tighter">OPSLY</div>
        <div className="flex gap-8 items-center text-sm font-medium text-gray-400">
          <a href="#features" className="hover:text-white transition">Features</a>
          <a href="/signup" className="bg-blue-600 hover:bg-blue-500 text-white px-5 py-2.5 rounded-lg transition shadow-lg shadow-blue-500/20">
            Start Free
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="flex flex-col items-center text-center px-6 mt-20 mb-32 max-w-4xl">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          Stop managing tools. <br />
          <span className="text-blue-500">Start running your team.</span>
        </h1>
        
        <p className="text-lg md:text-xl text-gray-400 max-w-2xl mb-10 leading-relaxed">
          Opsly is the lightweight Business OS for teams who have outgrown spreadsheets but aren't ready for complex enterprise bloat. 
          Manage users, projects, and growth in one simple dashboard.
        </p>

        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="/signup"
            className="bg-blue-600 hover:bg-blue-500 text-lg font-semibold px-8 py-4 rounded-xl transition shadow-xl shadow-blue-600/30"
          >
            Launch Your Workspace
          </a>
          <a
            href="#demo"
            className="bg-gray-800 hover:bg-gray-700 text-lg font-semibold px-8 py-4 rounded-xl transition border border-gray-700"
          >
            Watch Demo
          </a>
        </div>

        <p className="mt-6 text-sm text-gray-500">
          No credit card required. Up and running in 60 seconds.
        </p>
      </section>

      {/* Why Opsly Section */}
      <section id="features" className="w-full bg-[#111827] py-24 px-8 border-t border-gray-800/50">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12">
          
          <div className="space-y-4">
            <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center text-blue-500 text-2xl">👥</div>
            <h3 className="text-xl font-bold">Team Central</h3>
            <p className="text-gray-400">Unify your team. No more hunting for who is working on what or who has access to which tool.</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-indigo-500/10 rounded-lg flex items-center justify-center text-indigo-500 text-2xl">⚡</div>
            <h3 className="text-xl font-bold">Zero-Friction Workflow</h3>
            <p className="text-gray-400">Lightweight project tracking and activity feeds keep everyone in sync without the Slack noise.</p>
          </div>

          <div className="space-y-4">
            <div className="w-12 h-12 bg-purple-500/10 rounded-lg flex items-center justify-center text-purple-500 text-2xl">📈</div>
            <h3 className="text-xl font-bold">Growth First</h3>
            <p className="text-gray-400">Built-in analytics and viral loops help you focus on the only metric that matters: scaling your business.</p>
          </div>

        </div>
      </section>

      {/* Social Proof Placeholder */}
      <section className="py-24 text-center">
        <h2 className="text-gray-500 font-medium uppercase tracking-widest text-sm mb-12">Trusted by builders at</h2>
        <div className="flex flex-wrap justify-center gap-12 opacity-30 grayscale saturate-0 contrast-200">
          <span className="text-3xl font-black italic">STARTUP</span>
          <span className="text-3xl font-black italic">KIROV</span>
          <span className="text-3xl font-black italic">AGENCY</span>
          <span className="text-3xl font-black italic">LABS</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="w-full py-12 border-t border-gray-800 text-center text-gray-600 text-sm">
        © 2026 Opsly by Kirov Dynamics. All rights reserved.
      </footer>

    </main>
  );
}

