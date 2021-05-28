// This file is created by egg-ts-helper@1.25.8
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportClient = require('../../../app/controller/client');
import ExportComment = require('../../../app/controller/comment');
import ExportHome = require('../../../app/controller/home');
import ExportPublish = require('../../../app/controller/publish');
import ExportUser = require('../../../app/controller/user');

declare module 'egg' {
  interface IController {
    client: ExportClient;
    comment: ExportComment;
    home: ExportHome;
    publish: ExportPublish;
    user: ExportUser;
  }
}
