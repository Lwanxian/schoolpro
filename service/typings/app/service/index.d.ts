// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
type AnyClass = new (...args: any[]) => any;
type AnyFunc<T = any> = (...args: any[]) => T;
type CanExportFunc = AnyFunc<Promise<any>> | AnyFunc<IterableIterator<any>>;
type AutoInstanceType<T, U = T extends CanExportFunc ? T : T extends AnyFunc ? ReturnType<T> : T> = U extends AnyClass ? InstanceType<U> : U;
import ExportClient = require('../../../app/service/client');
import ExportComment = require('../../../app/service/comment');
import ExportPublish = require('../../../app/service/publish');
import ExportUser = require('../../../app/service/user');

declare module 'egg' {
  interface IService {
    client: AutoInstanceType<typeof ExportClient>;
    comment: AutoInstanceType<typeof ExportComment>;
    publish: AutoInstanceType<typeof ExportPublish>;
    user: AutoInstanceType<typeof ExportUser>;
  }
}
