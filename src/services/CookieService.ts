export class CookieService {
  static get allCookies() {
    return document.cookie;
  }

  public static put(name: string, value: string, days: number = 0.051) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  public static get(name: string) {
    let nameEQ = name + "=";
    let ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  public static remove(name: string) {
    // document.cookie = name+'=; Max-Age=-99999999;';
    // ---this update ensure that user and session_key is succefully removed
    const date = new Date();
    date.setTime(date.getTime() - 1);
    const expires = "; expires=" + date.toUTCString();

    document.cookie = name + "=" + expires + "; path=/";
  }
}
