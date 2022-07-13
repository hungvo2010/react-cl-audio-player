export default class FetchUtil {
    static ZDRM_API_REQUEST_MEDIA_HOST = 'http://localhost:10890/v1.0/drm-media/request-media';

    static async fetchLocationOfStaticMedia(mediaId) {
        const targetUrl = this.ZDRM_API_REQUEST_MEDIA_HOST + '?mediaId=' + mediaId;
        let fetchResp = await fetch(targetUrl);
        const respData = await fetchResp.json();
        if (respData && respData.data) {
            return respData.data.value;
        }
        return "";
    }

    static async fetchBytesOfStaticMedia(mediaId) {
        const targetUrl = await this.fetchLocationOfStaticMedia(mediaId);
        let fetchResp = await fetch("http://" + targetUrl);
        const bytesBuffer = await fetchResp.arrayBuffer();
        return bytesBuffer;
    }

    static async fetchUsageLicense(laUrl, userId, keyId) {
        const targetUrl = "http://" + laUrl + '?userId=' + userId + '&keyId=' + keyId;
        let fetchResp = await fetch(targetUrl);
        const respData = await fetchResp.json();
        return respData;
    }
}