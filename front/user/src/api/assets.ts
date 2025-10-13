import http from ".";

export function getAssetList(){
    return http.get('/')
}