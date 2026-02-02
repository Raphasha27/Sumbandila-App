/**
 * POPIA Compliance Utility
 * Helps in masking sensitive South African personal information
 */

/**
 * Mask South African ID Number
 * Example: 9001015000081 -> 900101*****81
 */
const maskIDNumber = (id) => {
    if (!id || id.length < 13) return id;
    return id.substring(0, 6) + '*****' + id.substring(11);
};

/**
 * Mask Email Address
 * Example: john.doe@example.com -> j***e@example.com
 */
const maskEmail = (email) => {
    if (!email || !email.includes('@')) return email;
    const [name, domain] = email.split('@');
    if (name.length <= 2) return email;
    return name[0] + '***' + name[name.length - 1] + '@' + domain;
};

/**
 * Mask Phone Number
 * Example: 0123456789 -> 012****789
 */
const maskPhone = (phone) => {
    if (!phone || phone.length < 10) return phone;
    return phone.substring(0, 3) + '****' + phone.substring(7);
};

module.exports = {
    maskIDNumber,
    maskEmail,
    maskPhone
};
