import { UserManager, WebStorageStateStore } from "oidc-client-ts";

const authConfig = {
    authority: "http://localhost:9000",
    client_id: "oidc-client",
    redirect_uri: "http://localhost:3000/callback",
    response_type: "code",
    scope: "openid profile email",
    post_logout_redirect_uri: "http://localhost:3000",
    metadata: {
        token_endpoint: "http://localhost:9000/oauth2/token",
        userinfo_endpoint: "http://localhost:9000/userinfo",
        authorization_endpoint:"http://localhost:9000/oauth2/authorize",
    },
    usePKCE: true,
    loadUserInfo: true,
    stateStore: new WebStorageStateStore({ store: window.localStorage }),
};

export const userManager = new UserManager(authConfig);

export const login = async () => {
    await userManager.signinRedirect();
};

export const logout = async () => {
    await userManager.removeUser();
    window.location.href = "/";
};
