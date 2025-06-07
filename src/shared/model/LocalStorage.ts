/**
 * @type {string}
 *
 * @description 프로젝트 규모가 커질 수록 특정 값을 어떤 이름으로 저장했는지 찾기 어려워지므로 유니언 타입을 통해 쉽게 찾을 수 있도록 타입을 추가했습니다.
 * 로컬 스토리지에 값을 추가할 일이 있으실 때는 아래 유니언 타입에 문자열을 추가하고 설명을 적어주시기 바랍니다.
 *
 * accessToken - 사용자의 Access Token
 */
type LocalStorageKey = 'accessToken' | '';

/**
 * @description 브라우저 환경에서만 작동하여 런타임 오류를 예방하고 필요에 따라 유연하게 커스터마이징 가능하도록 하기 위해 로컬 스토리지를 직접 정의 했습니다.
 */
class LocalStorage {
  constructor() {}

  /**
   * @description 로컬 스토리지의 해당 키에 값을 설정합니다. 해당 키가 존재하지 않으면 키와 값을 추가합니다.
   * 로컬 스토리지에 키와 값을 추가하실 때는 LocalStorageKey에 키로 사용할 문자열을 추가하시고 해당 키를 이용해주세요.
   *
   * @param {LocalStorageKey} key 키를 설정합니다.
   * @param {string} item 값을 설정합니다.
   */
  static setItem(key: LocalStorageKey, item: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, item);
    }
  }

  /**
   * @description 로컬 스토리지에서 해당 키의 값을 불러옵니다. 해당 키가 존재하지 않으면 null을 반환합니다.
   *
   * @param {LocalStorageKey} key 키를 설정합니다.
   */
  static getItem(key: LocalStorageKey) {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key);
    }
    return null;
  }

  /**
   * @description 로컬 스토리지에 해당 키와 값이 존재할 경우 해당 키와 값을 삭제합니다.
   *
   * @param {string} key 키를 설정합니다.
   */
  static removeItem(key: string) {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(key);
    }
  }
}

export default LocalStorage;
