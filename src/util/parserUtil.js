export default class ParserUtil {
    static WRMHEADER_BYTES_SIZE = 444;

    static getWRMHeaderFromBuffer(bytesBuffer, startIndex, endIndex) {
        const buffer = bytesBuffer.slice(startIndex, endIndex);
        return new Int8Array(buffer);
    }

    static convertBytesToXMLString(bytes) {
        const filtedBytes = bytes.filter(element => element > 0);
        const utf8Decoder = new TextDecoder("utf-8");
        return utf8Decoder.decode(filtedBytes);
    }

    static convertXMLStringToDOM(xmlString) {
        return new DOMParser().parseFromString(xmlString, "text/xml");
    }

    static getTagAttributeValuesFromXMLDOM(xmlDOM, tagName, attributeName) {
        const targetTag = xmlDOM.getElementsByTagName(tagName)[0];
        if (!targetTag) {
            return "";
        }
        return targetTag.getAttribute(attributeName);
    }

    static getTagTextContentFromXMLDOM(xmlDOM, tagName) {
        const targetTag = xmlDOM.getElementsByTagName(tagName)[0];
        if (!targetTag) {
            return "";
        }
        return targetTag.textContent;
    }


    static getTagAttributeValuesFromDOMBytes(bytes, tagName, attributeName) {
        const xmlString = this.convertBytesToXMLString(bytes);
        const xmlDom = this.convertXMLStringToDOM(xmlString);
        return this.getTagAttributeValuesFromXMLDOM(xmlDom, tagName, attributeName);
    }

    static getTagTextContentFromDOMBytes(bytes, tagName) {
        const xmlString = this.convertBytesToXMLString(bytes);
        const xmlDom = this.convertXMLStringToDOM(xmlString);
        return this.getTagTextContentFromXMLDOM(xmlDom, tagName);
    }

    static getKeyIdFromWRMHeader(wrmHeader) {
        return this.getTagAttributeValuesFromDOMBytes(wrmHeader, 'KID', 'VALUE');
    }

    static getLaUrlFromWRMHeader(wrmHeader) {
        return this.getTagTextContentFromDOMBytes(wrmHeader, 'LA_URL');
    }

    static getEncryptedContentFromBuffer(bytesBuffer, startIndex, endIndex) {
        const buffer = bytesBuffer.slice(startIndex, endIndex);
        return new Int8Array(buffer);
    }
}