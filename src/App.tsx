import {
  createTextField,
  fetchJSON,
  HTTPClient,
  jsonServerProvider,
  ListTable,
  Resource,
  Tushan,
  TushanContextProps
} from 'tushan';
import { authProvider } from './auth';
import { AppFields, kbFields, userFields } from './fields';
import { Dashboard } from './Dashboard';
import { IconApps, IconBook, IconUser } from 'tushan/icon';
import { i18nZhTranslation } from 'tushan/client/i18n/resources/zh';

const authStorageKey = 'tushan:auth';

const httpClient: HTTPClient = (url, options = {}) => {
  try {
    if (!options.headers) {
      options.headers = new Headers({ Accept: 'application/json' });
    }
    const { token } = JSON.parse(window.localStorage.getItem(authStorageKey) ?? '{}');
    (options.headers as Headers).set('Authorization', `Bearer ${ token }`);

    return fetchJSON(url, options);
  } catch (err) {
    return Promise.reject();
  }
};

const dataProvider = jsonServerProvider(import.meta.env.VITE_PUBLIC_SERVER_URL, httpClient);

const i18n: TushanContextProps['i18n'] = {
  languages: [
    {
      key: 'zh',
      label: '简体中文',
      translation: i18nZhTranslation
    }
  ]
};

function App() {
  return (
    <Tushan
      basename="/"
      header={ 'FastGPT-Admin' }
      i18n={ i18n }
      dataProvider={ dataProvider }
      authProvider={ authProvider }
      dashboard={ <Dashboard/> }
    >
      <Resource
        name="users"
        label="用户信息"
        icon={ <IconUser/> }
        list={
          <ListTable
            filter={ [
              createTextField('username', {
                label: '用户名'
              })
            ] }
            fields={ userFields }
            action={ { create: true, detail: true, edit: true, delete: true } }
          />
        }
      />
      <Resource
        name="apps"
        icon={ <IconApps/> }
        label="应用"
        list={
          <ListTable
            filter={ [
              createTextField('id', {
                label: '应用 id'
              }),
              createTextField('name', {
                label: '应用名称'
              })
            ] }
            fields={ AppFields }
            action={ { detail: true } }
          />
        }
      />
      {/*<Resource*/ }
      {/*  name="pays"*/ }
      {/*  label="支付记录"*/ }
      {/*  icon={ <IconStamp/> }*/ }
      {/*  list={*/ }
      {/*    <ListTable*/ }
      {/*      filter={ [*/ }
      {/*        createTextField('userId', {*/ }
      {/*          label: '用户 id'*/ }
      {/*        })*/ }
      {/*      ] }*/ }
      {/*      fields={ payFields }*/ }
      {/*      action={ { detail: true } }*/ }
      {/*    />*/ }
      {/*  }*/ }
      {/*/>*/ }
      <Resource
        name="kbs"
        label="知识库"
        icon={ <IconBook/> }
        list={
          <ListTable
            filter={ [
              createTextField('name', {
                label: '知识库名'
              }),
              // createTextField('tag', {
              //   label: 'tag'
              // })
            ] }
            fields={ kbFields }
            action={ { detail: true } }
          />
        }
      />
    </Tushan>
  );
}

export default App;
