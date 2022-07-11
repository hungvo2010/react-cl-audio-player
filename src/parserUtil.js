export default class ParserUtil {
    static WRMHEADER_BYTES_SIZE = 420;

    static getWRMHeaderFromBuffer(bytesBuffer, startIndex, endIndex) {
        const buffer = bytesBuffer.slice(startIndex, endIndex);
        return new Int8Array(buffer);
    }

    convertBytesToXMLString(bytes) {
        const filtedBytes = bytes.filter(element => element > 0);
        const utf8Decoder = new TextDecoder("utf-8");
        return utf8Decoder.decode(filtedBytes);
    }

    convertXMLStringToDOM(xmlString) {
        return new DOMParser().parseFromString(xmlString, "text/xml");
    }

    getTagAttributeValuesFromXMLDOM(xmlDOM, tagName, attributeName) {
        const targetTag = xmlDOM.getElementsByTagName(tagName)[0];
        if (!targetTag) {
            return "";
        }
        return targetTag.getAttribute(attributeName);
    }

    getTagTextContentFromXMLDOM(xmlDOM, tagName) {
        const targetTag = xmlDOM.getElementsByTagName(tagName)[0];
        if (!targetTag) {
            return "";
        }
        return targetTag.textContent;
    }


    getTagAttributeValuesFromDOMBytes(bytes, tagName, attributeName) {
        const xmlString = convertBytesToXMLString(bytes);
        const xmlDom = convertXMLStringToDOM9(xmlString);
        return getTagAttributeValuesFromXMLDOM(xmlDom, tagName, attributeName);
    }

    getTagTextContentFromDOMBytes(bytes, tagName) {
        const xmlString = convertBytesToXMLString(bytes);
        const xmlDom = convertXMLStringToDOM9(xmlString);
        return getTagTextContentFromXMLDOM(xmlDom, tagName);
    }

    static getKeyIdFromWRMHeader(wrmHeader) {
        return getTagAttributeValuesFromDOMBytes(wrmHeader, 'KID', 'VALUE');
    }

    static getLaUrlFromWRMHeader(wrmHeader) {
        return getTagTextContentFromDOMBytes(wrmHeader, 'LA_URL');
    }

    static getEncryptedContentFromBuffer(bytesBuffer, startIndex, endIndex) {
        return bytesBuffer.slice(startIndex, endIndex);
    }
}