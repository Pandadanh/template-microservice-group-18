/** Generate by swagger-axios-codegen */
// tslint:disable
/* eslint-disable */
// @ts-ignore
import axiosStatic, { AxiosInstance } from 'axios';

export interface IRequestOptions {
  headers?: any;
  baseURL?: string;
  responseType?: string;
}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: any;
}

// 기본 Axios 객체
import { Api } from '@psyrenpark/api';
export const serviceOptions: ServiceOptions = {
  axios: Api
};

const projectName = 'eradmin';
const projectEnv = 'prod';

const v1Api = `${projectName}-${projectEnv}-api-v1`;
const v1Cdn = `${projectName}-${projectEnv}-cdn-v1`;
const v1NoneAuth = `${projectName}-${projectEnv}-noneauth-v1`;
const v1Cms = `${projectName}-${projectEnv}-cms-v1`;

function pathToApiName(path: string): string {
  const firstPath: string = path.split('/')[1];
  let apiName = '';

  switch (apiName) {
    case 'api': {
      apiName = v1Api;
      break;
    }
    case 'cdn': {
      apiName = v1Cdn;
      break;
    }
    case 'noneauth': {
      apiName = v1NoneAuth;
      break;
    }
    case 'cms': {
      apiName = v1Cms;
      break;
    }
  }

  return apiName;
}

const basePath = 'http://localhost:2000/prod/v1';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class ApiService {
  /**
   * 코그니토 관련
   */
  static postCognitosPresignupSignup(options: IRequestOptions = {}, loadingCallback?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const path = '/cognitos-presignup-signup';
      let url = basePath + path;

      const myInit = {
        queryStringParameters: {},
        body: {},
        headers: {}
      };

      myInit.body = null;

      myInit.headers = {};

      const apiName = pathToApiName(path);

      serviceOptions.axios.post(apiName, url, myInit, loadingCallback);
    });
  }
  /**
   * 코그니토 관련
   */
  static postCognitosCustommessageSignup(options: IRequestOptions = {}, loadingCallback?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const path = '/cognitos-custommessage-signup';
      let url = basePath + path;

      const myInit = {
        queryStringParameters: {},
        body: {},
        headers: {}
      };

      myInit.body = null;

      myInit.headers = {};

      const apiName = pathToApiName(path);

      serviceOptions.axios.post(apiName, url, myInit, loadingCallback);
    });
  }
  /**
   * 코그니토 관련
   */
  static postCognitosPostconfirmationConfirmForgotPassword(
    options: IRequestOptions = {},
    loadingCallback?: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const path = '/cognitos-postconfirmation-confirmForgotPassword';
      let url = basePath + path;

      const myInit = {
        queryStringParameters: {},
        body: {},
        headers: {}
      };

      myInit.body = null;

      myInit.headers = {};

      const apiName = pathToApiName(path);

      serviceOptions.axios.post(apiName, url, myInit, loadingCallback);
    });
  }
  /**
   * 코그니토 관련
   */
  static postCognitosPostconfirmationConfirmsignup(options: IRequestOptions = {}, loadingCallback?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const path = '/cognitos-postconfirmation-confirmsignup';
      let url = basePath + path;

      const myInit = {
        queryStringParameters: {},
        body: {},
        headers: {}
      };

      myInit.body = null;

      myInit.headers = {};

      const apiName = pathToApiName(path);

      serviceOptions.axios.post(apiName, url, myInit, loadingCallback);
    });
  }
  /**
   * 코그니토 관련 comm 파라미터 참고
   */
  static postAdmins(
    params: {
      /** requestBody */
      body?: CreateAdminDto;
    } = {} as any,
    options: IRequestOptions = {},
    loadingCallback?: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const path = '/admins';
      let url = basePath + path;

      const myInit = {
        queryStringParameters: {},
        body: {},
        headers: {}
      };

      myInit.body = params.body;

      myInit.headers = {};

      const apiName = pathToApiName(path);

      serviceOptions.axios.post(apiName, url, myInit, loadingCallback);
    });
  }
  /**
   * 관리자 리스트 가져오기
   */
  static getAdmins(
    params: {
      /** 

    {"admin_no":"DESC"} 작성일 순 

    

     */
      orderBy?: string;
      /** 

    

     */
      filter?: string;
      /** asdasqweqweqweqw= */
      nextToken?: string;
      /**  */
      page?: number;
      /**  */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {},
    loadingCallback?: any
  ): Promise<ListResponeAdminDto> {
    return new Promise((resolve, reject) => {
      const path = '/admins';
      let url = basePath + path;

      const myInit = {
        queryStringParameters: {},
        body: {},
        headers: {}
      };
      myInit.queryStringParameters = {
        orderBy: params['orderBy'],
        filter: params['filter'],
        next_token: params['nextToken'],
        page: params['page'],
        limit: params['limit']
      };
      myInit.body = null;

      myInit.headers = {};

      const apiName = pathToApiName(path);

      serviceOptions.axios.get(apiName, url, myInit, loadingCallback);
    });
  }
  /**
   * 자기 정보 가져오기
   */
  static getAdminsMyInfo(options: IRequestOptions = {}, loadingCallback?: any): Promise<Admin> {
    return new Promise((resolve, reject) => {
      const path = '/admins-my-info';
      let url = basePath + path;

      const myInit = {
        queryStringParameters: {},
        body: {},
        headers: {}
      };

      myInit.body = null;

      myInit.headers = {};

      const apiName = pathToApiName(path);

      serviceOptions.axios.get(apiName, url, myInit, loadingCallback);
    });
  }
  /**
   * 코그니토 관련 comm 파라미터 참고
   */
  static postCusts(
    params: {
      /** requestBody */
      body?: CreateCustDto;
    } = {} as any,
    options: IRequestOptions = {},
    loadingCallback?: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const path = '/custs';
      let url = basePath + path;

      const myInit = {
        queryStringParameters: {},
        body: {},
        headers: {}
      };

      myInit.body = params.body;

      myInit.headers = {};

      const apiName = pathToApiName(path);

      serviceOptions.axios.post(apiName, url, myInit, loadingCallback);
    });
  }
  /**
   * 고객 리스트 가져오기
   */
  static getCusts(
    params: {
      /** 

    {"cust_no":"DESC"} 작성일 순 

    

     */
      orderBy?: string;
      /** 

    

     */
      filter?: string;
      /** asdasqweqweqweqw= */
      nextToken?: string;
      /**  */
      page?: number;
      /**  */
      limit?: number;
    } = {} as any,
    options: IRequestOptions = {},
    loadingCallback?: any
  ): Promise<ListResponeCustDto> {
    return new Promise((resolve, reject) => {
      const path = '/custs';
      let url = basePath + path;

      const myInit = {
        queryStringParameters: {},
        body: {},
        headers: {}
      };
      myInit.queryStringParameters = {
        orderBy: params['orderBy'],
        filter: params['filter'],
        next_token: params['nextToken'],
        page: params['page'],
        limit: params['limit']
      };
      myInit.body = null;

      myInit.headers = {};

      const apiName = pathToApiName(path);

      serviceOptions.axios.get(apiName, url, myInit, loadingCallback);
    });
  }
  /**
   * 자기 정보 가져오기
   */
  static getCustsMyInfo(options: IRequestOptions = {}, loadingCallback?: any): Promise<Cust> {
    return new Promise((resolve, reject) => {
      const path = '/custs-my-info';
      let url = basePath + path;

      const myInit = {
        queryStringParameters: {},
        body: {},
        headers: {}
      };

      myInit.body = null;

      myInit.headers = {};

      const apiName = pathToApiName(path);

      serviceOptions.axios.get(apiName, url, myInit, loadingCallback);
    });
  }
  /**
   *
   */
  static postProducts(
    params: {
      /** requestBody */
      body?: CreateProductDto;
    } = {} as any,
    options: IRequestOptions = {},
    loadingCallback?: any
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      const path = '/products';
      let url = basePath + path;

      const myInit = {
        queryStringParameters: {},
        body: {},
        headers: {}
      };

      myInit.body = params.body;

      myInit.headers = {};

      const apiName = pathToApiName(path);

      serviceOptions.axios.post(apiName, url, myInit, loadingCallback);
    });
  }
  /**
   *
   */
  static getProducts(options: IRequestOptions = {}, loadingCallback?: any): Promise<any> {
    return new Promise((resolve, reject) => {
      const path = '/products';
      let url = basePath + path;

      const myInit = {
        queryStringParameters: {},
        body: {},
        headers: {}
      };

      myInit.body = null;

      myInit.headers = {};

      const apiName = pathToApiName(path);

      serviceOptions.axios.get(apiName, url, myInit, loadingCallback);
    });
  }
  /**
   * 코드 타입 전부 가져오기
   */
  static getCodeTypes(options: IRequestOptions = {}, loadingCallback?: any): Promise<ListResponeCodeTypeDto> {
    return new Promise((resolve, reject) => {
      const path = '/code-types';
      let url = basePath + path;

      const myInit = {
        queryStringParameters: {},
        body: {},
        headers: {}
      };

      myInit.body = null;

      myInit.headers = {};

      const apiName = pathToApiName(path);

      serviceOptions.axios.get(apiName, url, myInit, loadingCallback);
    });
  }
}

export interface CreateAdminDto {
  /** 코그니토 아이디 */
  admin_uuid: string;

  /** 이메일 */
  email_addr: string;

  /** 관리자 이름 */
  admin_nm: string;
}

export interface Admin {
  /** admin_no */
  admin_no: string;

  /** admin_uuid */
  admin_uuid: string;

  /** email_addr */
  email_addr: string;

  /** admin_nm */
  admin_nm: string;

  /** 삭제시 admin_no 넣음 */
  del_no: string;
}

export interface ListResponeAdminDto {
  /** 해당 타입의 배열 */
  items: Admin[];

  /** 해당 총 갯수 */
  total_count: number;

  /** 해당 총 페이지수 */
  total_page: number;

  /** 현재 페이지 */
  current_page: number;

  /** 다음페이지 필요시 넣을것 "" 일경우 다음페이지 없음 */
  next_token: string;

  /** 현제 limit */
  limit: number;
}

export interface CreateCustDto {
  /** 코그니토 아이디 */
  cust_uuid: string;

  /** 이메일 */
  email_addr: string;

  /** 관리자 이름 */
  cust_nm: string;

  /** 아이디 */
  cust_id: string;

  /** moblphon_no */
  moblphon_no: string;

  /** birthday */
  birthday: string;

  /** S00001 \/ S00002 */
  sex_cd: string;

  /** JCS001 구글 \/ JCS002 애플 \/ JCS003 카카오  \/ JCS004 페이스북  */
  join_course_se_cd: string;
}

export interface Cust {
  /** cust_no */
  cust_no: string;

  /** cust_uuid */
  cust_uuid: string;

  /** cust_id */
  cust_id: string;

  /** email_addr */
  email_addr: string;

  /** admin_nm */
  cust_nm: string;

  /** moblphon_no */
  moblphon_no: string;

  /** birthday */
  birthday: string;

  /** S00001 \/ S00002 */
  sex_cd: string;

  /** join_course_se_cd */
  join_course_se_cd: string;

  /** 삭제시 cust_no 넣음 */
  del_no: string;

  /** cust_images[] */
  cust_images: string[];
}

export interface ListResponeCustDto {
  /** 해당 타입의 배열 */
  items: Cust[];

  /** 해당 총 갯수 */
  total_count: number;

  /** 해당 총 페이지수 */
  total_page: number;

  /** 현재 페이지 */
  current_page: number;

  /** 다음페이지 필요시 넣을것 "" 일경우 다음페이지 없음 */
  next_token: string;

  /** 현제 limit */
  limit: number;
}

export interface UpdateCustImageDto {
  /** 
        이미지 url s3업로드후 나오는 경로 uuid로 만든다. 
        public
         */
  img_url_addr: string;
}

export interface CustImage {
  /** cust_no */
  cust_no: string;

  /** 이미지 순번 */
  img_sn: string;

  /** 이미지 url */
  img_url_addr: string;

  /** s3 풀 경로  http:[s3 url or cdn]\/car\/image-07ea8ad9-6e4b-4852-8e04-0fb4a325c4aa.jpg */
  img_full_url_addr: object;
}

export interface CreateProductDto {}

export interface UpdateProductDto {}

export interface Code {
  /** code의 type 기본키 */
  cd_typ_no: string;

  /** 코드 아이디 */
  cd_no: string;

  /** code 이름 */
  cd_nm: string;

  /** code 이름 */
  cd_typ_eng_nm: string;
}

export interface ListResponeCodeDto {
  /** 해당 타입의 배열 */
  items: Code[];

  /** 해당 총 갯수 */
  total_count: number;

  /** 해당 총 페이지수 */
  total_page: number;

  /** 현재 페이지 */
  current_page: number;

  /** 다음페이지 필요시 넣을것 "" 일경우 다음페이지 없음 */
  next_token: string;

  /** 현제 limit */
  limit: number;
}

export interface CodeType {
  /** code type의 기본키 */
  cd_typ_no: string;

  /** code type 설명 */
  cd_typ_nm: string;

  /** code type 설명 */
  cd_typ_eng_nm: string;
}

export interface ListResponeCodeTypeDto {
  /** 해당 타입의 배열 */
  items: CodeType[];

  /** 해당 총 갯수 */
  total_count: number;

  /** 해당 총 페이지수 */
  total_page: number;

  /** 현재 페이지 */
  current_page: number;

  /** 다음페이지 필요시 넣을것 "" 일경우 다음페이지 없음 */
  next_token: string;

  /** 현제 limit */
  limit: number;
}
