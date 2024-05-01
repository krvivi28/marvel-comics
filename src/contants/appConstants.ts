export const baseUrl = "https://gateway.marvel.com";
export const hash = "c2bbb2284518ef1bf69e09cbcd3f6ae7";
export const publicKey = "f56a9ffdcb279eb33fecc007602b9b29";
export const privateKey = "29cc9db8aa92235cf2c9c66d0694290f51199986";
let ts = 1;
export const getAuthKey = () => {
  const authString = `?ts=${ts}&apikey=${publicKey}&hash=${hash}`;
  return authString;
};
