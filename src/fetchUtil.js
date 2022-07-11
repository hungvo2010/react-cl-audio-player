export default class FetchUtil {
    static ZDRM_API_REQUEST_MEDIA_HOST = 'http://localhost:10890/v1.0/drm-media/request-media';
    static ZDRM_API_GET_LICENSE_HOST = 'http://localhost:10890/v1.0/drm-license/get-license';

    static async fetchBytesOfStaticMedia(mediaId) {
        const targetUrl = this.ZDRM_API_REQUEST_MEDIA_HOST + '/mediaId=' + mediaId; 
        let fetchResp = await fetch(targetUrl);
        const bytesBuffer = await fetchResp.arrayBuffer();
        return bytesBuffer;
    }

    static async fetchUsageLicense(laUrl, userId, keyId) {
        const targetUrl = this.ZDRM_API_GET_LICENSE_HOST + '/userId=' + userId + '/keyId=' + keyId;
        let fetchResp = await fetch(targetUrl);
        const respData = await fetchResp.json();
        return respData;
    }
}