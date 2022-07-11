const crypto = require('crypto');

export default class DecryptUtil {
    INITIAL_VECTOR_SIZE = 16;
    static decryptMediaContent(encryptedContent, contentKey) {
        const initialVector = encryptedContent.slice(0, this.INITIAL_VECTOR_SIZE);
        const cipher = crypto.createDecipheriv('aes-128-cbc', Buffer.from(contentKey, 'hex'), Buffer.from(initialVector));
        return cipher.update(encryptedContent, 'hex', 'utf8') + cipher.final('utf8');
    }
}