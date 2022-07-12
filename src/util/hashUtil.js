export default class HashUtil {
    static SHA256_CONTENT_KEY_SIZE = 16;
    static async sha256(msgBytes) {
        const msgBuffer = new Int8Array(msgBytes).buffer;
        const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
        return hashBuffer;
    }

    static async sha256HashContentKey(msgBytes) {
        const hashBuffer = await this.sha256(msgBytes);
        return new Int8Array(hashBuffer).slice(0, this.SHA256_CONTENT_KEY_SIZE);
    }
} 