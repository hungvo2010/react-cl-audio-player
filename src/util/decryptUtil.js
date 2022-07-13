const crypto = require('crypto');

export default class DecryptUtil {
    static INITIAL_VECTOR_SIZE = 16;
    static async decryptMediaContent(encryptedContent, contentKey) {
        const initialVector = encryptedContent.slice(0, this.INITIAL_VECTOR_SIZE);  
        const realEncryptedContent = encryptedContent.slice(this.INITIAL_VECTOR_SIZE, encryptedContent.length);
        const cipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(contentKey), Buffer.from(initialVector));
        const rawBytes = Buffer.concat([cipher.update(Buffer.from(realEncryptedContent)), cipher.final()]);
        return new Int8Array(rawBytes);
    }
}