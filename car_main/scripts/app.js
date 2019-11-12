'use strict';
/**
 * @ngdoc overview
 * @name sbAdminApp
 * @description
 * # sbAdminApp
 *
 * Main module of the application.
 */
var iwoboApp = angular.module('sbAdminApp', [
    'LocalStorageModule',
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
    'duScroll',
    'treeControl',
    'ngWebSocket'
]);
iwoboApp.config(['$httpProvider', '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider', function ($httpProvider, $stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
        debug: false,
        events: true,
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
        .state('dashboard', {
            url: '/dashboard',
            templateUrl: 'views/dashboard/main.html',
            resolve: {
                loadMyDirectives: function ($ocLazyLoad) {
                    return $ocLazyLoad.load(
                        {
                            name: 'sbAdminApp',
                            files: [
                                'scripts/controllers/modal/modalController.js',
                                'scripts/directives/header/header.js',
                                'scripts/directives/header/header-notification/header-notification.js',
                                'scripts/directives/sidebar/sidebar.js',
                                'scripts/directives/sidebar/sidebar-search/sidebar-search.js'
                            ]
                        }),
                        $ocLazyLoad.load(
                            {
                                name: 'toggle-switch',
                                files: ["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                                    "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                                ]
                            }),
                        $ocLazyLoad.load(
                            {
                                name: 'ngAnimate',
                                files: ['bower_components/angular-animate/angular-animate.js']
                            }),
                        $ocLazyLoad.load(
                            {
                                name: 'ngCookies',
                                files: ['bower_components/angular-cookies/angular-cookies.js']
                            }),
                        $ocLazyLoad.load(
                            {
                                name: 'ngResource',
                                files: ['bower_components/angular-resource/angular-resource.js']
                            }),
                        $ocLazyLoad.load(
                            {
                                name: 'ngSanitize',
                                files: ['bower_components/angular-sanitize/angular-sanitize.js']
                            })
                    $ocLazyLoad.load(
                        {
                            name: 'ngTouch',
                            files: ['bower_components/angular-touch/angular-touch.js']
                        })
                }
            }
        })
        .state('dashboard.home', {
            url: '/home',
            controller: 'MainCtrl',
            templateUrl: 'views/dashboard/home.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'scripts/directives/dashboard/stats/stats.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.form', {
            templateUrl: 'views/form.html',
            url: '/form'
        })
        .state('dashboard.blank', {
            templateUrl: 'views/pages/blank.html',
            url: '/blank'
        })
        .state('login', {
            templateUrl: 'views/pages/login.html',
            url: '/login',
            controller: 'LoginCtrl',
            params: {
                "from": null
            },
            resolve: {
                loadMyFile: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/loginController.js',
                            'scripts/controllers/modal/promptModalController.js'
                        ]
                    })
                }
            }
        })
        .state('register', {
            templateUrl: 'views/pages/register.html',
            url: '/register',
            controller: 'RegisterCtrl',
            resolve: {
                loadMyFile: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/registerController.js',
                            'scripts/controllers/modal/registerModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.index', {
            url: '/index',
            controller: 'IndexCtrl',
            templateUrl: 'views/dashboard/index/index.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'scripts/directives/dashboard/stats/stats.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/index/indexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.unfinishedTaskIndex', {
            url: '/unfinishedTaskIndex',
            controller: 'UnfinishedTaskIndexCtrl',
            templateUrl: 'views/dashboard/task/unfinishedTaskIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/task/unfinishedTaskIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.unfinishedTaskIndex.unfinishedTaskList', {
            url: '/unfinishedTaskList',
            controller: 'UnfinishedTaskListCtrl',
            templateUrl: 'views/dashboard/task/unfinishedTaskList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/task/unfinishedTaskListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.finishedTaskIndex', {
            url: '/finishedTaskIndex',
            controller: 'FinishedTaskIndexCtrl',
            templateUrl: 'views/dashboard/task/finishedTaskIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/task/finishedTaskIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.finishedTaskIndex.finishedTaskList', {
            url: '/finishedTaskList',
            controller: 'FinishedTaskListCtrl',
            templateUrl: 'views/dashboard/task/finishedTaskList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/task/finishedTaskListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.finishedTaskIndex.approveEpInfo', {
            url: '/approveEpInfo',
            controller: 'ApproveEpInfoCtrl',
            templateUrl: 'views/dashboard/admin/approveEpInfo.html',
            params: {
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/admin/approveEpInfoController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/admin/approveDetailModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.finishedTaskIndex.approveEpModifyInfo', {
            url: '/approveEpModifyInfo',
            controller: 'ApproveEpModifyInfoCtrl',
            templateUrl: 'views/dashboard/admin/approveEpModifyInfo.html',
            params: {
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/admin/approveEpModifyInfoController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/admin/approveDetailModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.unfinishedTaskIndex.approveEpModifyInfoUnfinished', {
            url: '/approveEpModifyInfoUnfinished',
            controller: 'ApproveEpModifyInfoCtrl',
            templateUrl: 'views/dashboard/admin/approveEpModifyInfo.html',
            params: {
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/admin/approveEpModifyInfoController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/admin/approveDetailModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.finishedTaskIndex.approveEpInfoHistory', {
            url: '/approveEpInfoHistory',
            controller: 'ApproveEpInfoHistoryCtrl',
            templateUrl: 'views/dashboard/admin/approveEpInfoHistory.html',
            params: {
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "oldFrom": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/admin/approveEpInfoHistoryController.js',
                            'scripts/controllers/modal/promptModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.unfinishedTaskIndex.approveEpInfo', {
            url: '/approveEpInfo',
            controller: 'ApproveEpInfoCtrl',
            templateUrl: 'views/dashboard/admin/approveEpInfo.html',
            params: {
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/admin/approveEpInfoController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/admin/approveDetailModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.unfinishedTaskIndex.epAdminManageUnfinishedTaskForAdmin', {
            url: '/epAdminManageUnfinishedTaskForAdmin',
            controller: 'ApproveEpAdminInfoCtrl',
            templateUrl: 'views/dashboard/admin/approveEpAdminInfo.html',
            params: {
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/admin/approveEpAdminInfoController.js',
                            'scripts/controllers/admin/approveDetailModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.finishedTaskIndex.epAdminManageFinishedTaskForAdmin', {
            url: '/epAdminManageFinishedTaskForAdmin',
            controller: 'ApproveEpAdminInfoCtrl',
            templateUrl: 'views/dashboard/admin/approveEpAdminInfo.html',
            params: {
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/admin/approveEpAdminInfoController.js',
                            'scripts/controllers/admin/approveDetailModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.unfinishedTaskIndex.planMain', {
            // cache:'false', 
            url: '/unfinishedPlanMain',
            controller: 'PlanMainCtrl',
            templateUrl: 'views/dashboard/plan/planMain.html',
            params: {
                "tpId": null,
                "from": null,
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "epId": null,
                "epName": null,
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'styles/plan/index.css',
                            'scripts/controllers/admin/approveDetailModalController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/plan/planMainController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.finishedTaskIndex.planMain', {
            url: '/finishedPlanMain',
            controller: 'PlanMainCtrl',
            templateUrl: 'views/dashboard/plan/planMain.html',
            params: {
                "tpId": null,
                "from": null,
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "epId": null,
                "epName": null,
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'styles/plan/index.css',
                            'scripts/controllers/admin/approveDetailModalController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/plan/planMainController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.planIndex', {
            url: '/planIndex',
            controller: 'PlanIndexCtrl',
            templateUrl: 'views/dashboard/plan/planIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/plan/planIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.planIndex.planMain', {
            url: '/planMain',
            controller: 'PlanMainCtrl',
            templateUrl: 'views/dashboard/plan/planMain.html',
            params: {
                "tpId": null,
                "epId": null,
                "epName": null,
                "from": null,
                "btnFlag":null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'styles/plan/index.css',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/plan/planMainController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.planIndex.planList', {
            url: '/planList',
            controller: 'PlanListCtrl',
            templateUrl: 'views/dashboard/plan/planList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/plan/planListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.carPlan', {
            url: '/carPlan',
            controller: 'CarPlanCtrl',
            templateUrl: 'views/dashboard/car/carPlan.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/carPlanController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.carExcel', {
            url: '/carExcel',
            controller: 'CarExcelCtrl',
            templateUrl: 'views/dashboard/car/carExcel.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/utils/uploadExcel.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/carExcelController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.carIndex', {
            url: '/carIndex',
            controller: 'CarIndexCtrl',
            templateUrl: 'views/dashboard/car/carIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/car/carIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.carIndex.carList', {
            url: '/carList',
            controller: 'CarListCtrl',
            templateUrl: 'views/dashboard/car/carList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/carListController.js',
                            'scripts/controllers/car/carModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.appOrderIndex', {
            url: '/appOrderIndex',
            controller: 'AppOrderIndexCtrl',
            templateUrl: 'views/dashboard/car/appOrderIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/car/appOrderIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.appOrderIndex.appOrderList', {
            url: '/appOrderList',
            controller: 'AppOrderListCtrl',
            templateUrl: 'views/dashboard/car/appOrderList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/appOrderListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.appOrderIndex.appOrderDetailList', {
            url: '/appOrderDetailList',
            controller: 'AppOrderDetailListCtrl',
            templateUrl: 'views/dashboard/car/appOrderDetailList.html',
            params: {
                "id": null,
                "from":null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dateTools/WdatePicker.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/car/financeFlowModalController.js',
                            'scripts/controllers/car/appOrderDetailListController.js',
                        ]
                    })
                }
            }
        })
        .state('dashboard.notPayNumIndex', {
            url: '/notPayNumIndex',
            controller: 'NotPayNumIndexCtrl',
            templateUrl: 'views/dashboard/car/contractIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/car/notPayNumIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.notPayNumIndex.notPayNumList', {
            url: '/notPayNumList',
            controller: 'NotPayNumListCtrl',
            templateUrl: 'views/dashboard/car/contractList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/notPayNumListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.notPayNumIndex.contractDetailList', {
            url: '/contractDetailList',
            controller: 'ContractDetailListCtrl',
            templateUrl: 'views/dashboard/car/contractDetailList.html',
            params: {
                "id": null,
                "from":null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dateTools/WdatePicker.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/car/financeFlowModalController.js',
                            'scripts/controllers/car/carTableModalController.js',
                            'scripts/controllers/car/carTableDeliverModalController.js',
                            'scripts/controllers/car/carTableReadModalController.js',
                            'scripts/controllers/car/createWordModalController.js',
                            'scripts/controllers/car/contractDetailListController.js',
                        ]
                    })
                }
            }
        })
        .state('dashboard.notPayNumIndex.contractDetailForBackList', {
            url: '/contractDetailForBackList',
            controller: 'ContractDetailForBackListCtrl',
            templateUrl: 'views/dashboard/car/contractDetailForBackList.html',
            params: {
                "id": null,
                "from":null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dateTools/WdatePicker.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/car/financeFlowModalController.js',
                            'scripts/controllers/car/carTableModalController.js',
                            'scripts/controllers/car/carTableBackModalController.js',
                            'scripts/controllers/car/carTableDeliverModalController.js',
                            'scripts/controllers/car/carTableReadModalController.js',
                            'scripts/controllers/car/contractDetailForBackListController.js',
                        ]
                    })
                }
            }
        })
        .state('dashboard.contractIndex', {
            url: '/contractIndex',
            controller: 'ContractIndexCtrl',
            templateUrl: 'views/dashboard/car/contractIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/car/contractIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.contractIndex.contractList', {
            url: '/contractList',
            controller: 'ContractListCtrl',
            templateUrl: 'views/dashboard/car/contractList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/contractListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.contractIndex.contractDetailList', {
            url: '/contractDetailList',
            controller: 'ContractDetailListCtrl',
            templateUrl: 'views/dashboard/car/contractDetailList.html',
            params: {
                "id": null,
                "from":null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dateTools/WdatePicker.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/car/financeFlowModalController.js',
                            'scripts/controllers/car/carTableModalController.js',
                            'scripts/controllers/car/carTableDeliverModalController.js',
                            'scripts/controllers/car/carTableReadModalController.js',
                            'scripts/controllers/car/createWordModalController.js',
                            'scripts/controllers/car/contractDetailListController.js',
                        ]
                    })
                }
            }
        })
        .state('dashboard.contractIndex.contractDetailForBackList', {
            url: '/contractDetailForBackList',
            controller: 'ContractDetailForBackListCtrl',
            templateUrl: 'views/dashboard/car/contractDetailForBackList.html',
            params: {
                "id": null,
                "from":null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dateTools/WdatePicker.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/car/financeFlowModalController.js',
                            'scripts/controllers/car/carTableModalController.js',
                            'scripts/controllers/car/carTableBackModalController.js',
                            'scripts/controllers/car/carTableDeliverModalController.js',
                            'scripts/controllers/car/carTableReadModalController.js',
                            'scripts/controllers/car/contractDetailForBackListController.js',
                        ]
                    })
                }
            }
        })
        .state('dashboard.replaceIndex', {
            url: '/replaceIndex',
            controller: 'ReplaceIndexCtrl',
            templateUrl: 'views/dashboard/car/replaceIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/car/replaceIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.replaceIndex.replaceList', {
            url: '/replaceList',
            controller: 'ReplaceListCtrl',
            templateUrl: 'views/dashboard/car/replaceList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/replaceListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.replaceIndex.replaceDetailList', {
            url: '/replaceDetailList',
            controller: 'ReplaceDetailListCtrl',
            templateUrl: 'views/dashboard/car/replaceDetailList.html',
            params: {
                "obj": null,
                "from":null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dateTools/WdatePicker.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/car/financeFlowModalController.js',
                            'scripts/controllers/car/carTableReplaceModalController.js',
                            'scripts/controllers/car/carTableDeliverModalController.js',
                            'scripts/controllers/car/carTableReadModalController.js',
                            'scripts/controllers/car/replaceDetailListController.js',
                        ]
                    })
                }
            }
        })
        .state('dashboard.replaceIndex.replaceDetailForBackList', {
            url: '/replaceDetailForBackList',
            controller: 'ReplaceDetailForBackListCtrl',
            templateUrl: 'views/dashboard/car/replaceDetailForBackList.html',
            params: {
                "id": null,
                "replaceId":null,
                "from":null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dateTools/WdatePicker.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/car/financeFlowModalController.js',
                            'scripts/controllers/car/carTableModalController.js',
                            'scripts/controllers/car/carTableBackModalController.js',
                            'scripts/controllers/car/carTableBackBackModalController.js',
                            'scripts/controllers/car/carTableDeliverModalController.js',
                            'scripts/controllers/car/carTableReadModalController.js',
                            'scripts/controllers/car/replaceDetailForBackListController.js',
                        ]
                    })
                }
            }
        })
        .state('dashboard.carCountIndex', {
            url: '/carCountIndex',
            controller: 'CarCountIndexCtrl',
            templateUrl: 'views/dashboard/car/carCountIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/car/carCountIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.carCountIndex.carCountList', {
            url: '/carCountList',
            controller: 'CarCountListCtrl',
            templateUrl: 'views/dashboard/car/carCountList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/carCountListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.carCountIndex.carCountDetailList', {
            url: '/carCountDetailList',
            controller: 'CarCountDetailListCtrl',
            templateUrl: 'views/dashboard/car/carCountDetailList.html',
            params: {
                "planName": null,
                "from":null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/carCountDetailListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.yearchecklistIndex', {
            url: '/yearchecklistIndex',
            controller: 'YearchecklistIndexCtrl',
            templateUrl: 'views/dashboard/car/yearchecklistIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/car/yearchecklistIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.yearchecklistIndex.yearchecklist', {
            url: '/yearchecklist',
            controller: 'YearchecklistCtrl',
            templateUrl: 'views/dashboard/car/yearchecklist.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/yearchecklistController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.breakrulesListIndex', {
            url: '/breakrulesListIndex',
            controller: 'BreakrulesListIndexCtrl',
            templateUrl: 'views/dashboard/car/breakrulesListIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/car/breakrulesListIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.breakrulesListIndex.breakrulesList', {
            url: '/breakrulesList',
            controller: 'BreakrulesListCtrl',
            templateUrl: 'views/dashboard/car/breakrulesList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/breakrulesListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.breakrulesListIndex.breakrulesListDetail', {
            url: '/breakrulesListDetail',
            controller: 'BreakrulesListDetailCtrl',
            templateUrl: 'views/dashboard/car/breakrulesListDetail.html',
            params: {
                "ID":"",
                "PLATE_NUM":"",
                "BREAKRULES_TIME":"",
                "BREAKRULES_ADDRESS":"",
                "BREAKRULES_DO":"",
                "ifAdd": null,
                "from":null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/car/breakrulesListDetailController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.customerlistIndex', {
            url: '/customerlistIndex',
            controller: 'CustomerlistIndexCtrl',
            templateUrl: 'views/dashboard/car/customerlistIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/car/customerlistIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.customerlistIndex.customerlist', {
            url: '/customerlist',
            controller: 'CustomerlistCtrl',
            templateUrl: 'views/dashboard/car/customerlist.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/customerlistController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.customerwilllistIndex', {
            url: '/customerwilllistIndex',
            controller: 'CustomerwilllistIndexCtrl',
            templateUrl: 'views/dashboard/car/customerwilllistIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/car/customerwilllistIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.customerwilllistIndex.customerwilllist', {
            url: '/customerwilllist',
            controller: 'CustomerwilllistCtrl',
            templateUrl: 'views/dashboard/car/customerwilllist.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/customerwilllistController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.repairIndex', {
            url: '/repairIndex',
            controller: 'RepairIndexCtrl',
            templateUrl: 'views/dashboard/car/repairIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/car/repairIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.repairIndex.repairList', {
            url: '/repairList',
            controller: 'RepairListCtrl',
            templateUrl: 'views/dashboard/car/repairList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/repairListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.repairIndex.repairDetailList', {
            url: '/repairDetailList',
            controller: 'RepairDetailListCtrl',
            templateUrl: 'views/dashboard/car/repairDetailList.html',
            params: {
                "repairId": null,
                "ifAdd": null,
                "from":null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dateTools/WdatePicker.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/car/repairDetailListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.repairFlowIndex', {
            url: '/repairFlowIndex',
            controller: 'RepairFlowIndexCtrl',
            templateUrl: 'views/dashboard/car/repairFlowIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/car/repairFlowIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.repairFlowIndex.repairFlowList', {
            url: '/repairFlowList',
            controller: 'RepairFlowListCtrl',
            templateUrl: 'views/dashboard/car/repairFlowList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/repairFlowListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.repairFlowIndex.repairFlowDetailList', {
            url: '/repairFlowDetailList',
            controller: 'RepairFlowDetailListCtrl',
            templateUrl: 'views/dashboard/car/repairFlowDetailList.html',
            params: {
                "flowId": null,
                "ifAdd": null,
                "from":null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/dateTools/WdatePicker.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/car/repairFlowDetailListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.carPark', {
            url: '/carPark',
            controller: 'CarParkCtrl',
            templateUrl: 'views/dashboard/car/carPark.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/carParkController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.componentExcel', {
            url: '/componentExcel',
            controller: 'ComponentExcelCtrl',
            templateUrl: 'views/dashboard/car/componentExcel.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/directives/utils/uploadExcel.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/componentExcelController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.componentIndex', {
            url: '/componentIndex',
            controller: 'ComponentIndexCtrl',
            templateUrl: 'views/dashboard/car/componentIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/car/componentIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.componentIndex.componentList', {
            url: '/componentList',
            controller: 'ComponentListCtrl',
            templateUrl: 'views/dashboard/car/componentList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/componentListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.insureanceIndex', {
            url: '/insureanceIndex',
            controller: 'InsureanceIndexCtrl',
            templateUrl: 'views/dashboard/car/insureanceIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/car/insureanceIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.insureanceIndex.insureanceList', {
            url: '/insureanceList',
            controller: 'InsureanceListCtrl',
            templateUrl: 'views/dashboard/car/insureanceList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/car/insureanceListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.roleIndex', {
            url: '/roleIndex',
            controller: 'RoleIndexCtrl',
            templateUrl: 'views/dashboard/sysadmin/roleIndex.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/sysadmin/roleIndexController.js'
                        ]
                    })
                }
            }
        })
        
        .state('dashboard.roleIndex.roleList', {
            url: '/roleList',
            controller: 'RoleListCtrl',
            templateUrl: 'views/dashboard/sysadmin/roleList.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/sysadmin/roleListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.roleIndex.roleInfo', {
            url: '/roleInfo',
            controller: 'RoleInfoCtrl',
            templateUrl: 'views/dashboard/sysadmin/roleInfo.html',
            params: {
                "roleId": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            
                            'scripts/directives/dashboard/stats/stats.js',
                            'scripts/controllers/sysadmin/roleInfoController.js',
                            'scripts/controllers/modal/promptModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.roleIndex.roleMenu', {
            url: '/roleMenu',
            controller: 'RoleMenuCtrl',
            templateUrl: 'views/dashboard/sysadmin/roleMenu.html',
            params: {
                "roleId": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/sysadmin/roleMenuController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.roleIndex.roleUser', {
            url: '/roleUser',
            controller: 'RoleUserCtrl',
            templateUrl: 'views/dashboard/sysadmin/roleUser.html',
            params: {
                "roleId": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/sysadmin/roleUserController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.menu', {
            templateUrl: 'views/dashboard/menu/menu.html',
            url: '/menu',
            controller: 'MenuCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/menu/menuController.js',
                            'scripts/controllers/modal/promptModalController.js'
                        ]
                    })
                }
            }
        })
        // .state('dashboard.modifyPwd', {
        //     templateUrl: 'views/dashboard/modifyPwd.html',
        //     url: '/modifyPwd',
        //     controller: 'ModifyPwdCtrl',
        //     resolve: {
        //         loadMyFile: function ($ocLazyLoad) {
        //             return $ocLazyLoad.load({
        //                 name: 'sbAdminApp',
        //                 files: [
        //                     'scripts/controllers/modifyPwdController.js',
        //                     'scripts/controllers/modal/promptModalController.js'
        //                 ]
        //             })
        //         }
        //     }
        // })
        .state('dashboard.planForAdminIndex', {
            url: '/planForAdminIndex',
            templateUrl: 'views/dashboard/planAdmin/planForAdminIndex.html',
            controller: 'PlanForAdminIndexCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/planAdmin/planForAdminIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.planForAdminIndex.planForAdminList', {
            url: '/planForAdminList',
            templateUrl: 'views/dashboard/planAdmin/planForAdminList.html',
            controller: 'PlanForAdminListCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/planAdmin/planForAdminListController.js',
                            'scripts/controllers/modal/promptModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.planForAdminIndex.planForAdminMain', {
            url: '/planForAdminMain',
            controller: 'PlanMainCtrl',
            templateUrl: 'views/dashboard/plan/planMain.html',
            params: {
                "tpId": null,
                "from": null,
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "epId": null,
                "epName": null,
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'styles/plan/index.css',
                            'scripts/controllers/admin/approveDetailModalController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/plan/planMainController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.monitorForAdminIndex', {
            url: '/monitorForAdminIndex',
            templateUrl: 'views/dashboard/monitorAdmin/monitorForAdminIndex.html',
            controller: 'MonitorForAdminIndexCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/monitorAdmin/monitorForAdminIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.monitorForAdminIndex.monitorForAdminList', {
            url: '/monitorForAdminList',
            templateUrl: 'views/dashboard/monitorAdmin/monitorForAdminList.html',
            controller: 'MonitorForAdminListCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/monitorAdmin/monitorForAdminListController.js',
                            'scripts/controllers/modal/promptModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.monitorForAdminIndex.monitorForAdminMain', {
            url: '/monitorForAdminMain',
            controller: 'PlanMainCtrl',
            templateUrl: 'views/dashboard/plan/planMain.html',
            params: {
                "tpId": null,
                "from": null,
                "bizId": null,
                "applyId": null,
                "btnFlag": null,
                "epId": null,
                "epName": null,
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'styles/plan/index.css',
                            'scripts/controllers/admin/approveDetailModalController.js',
                            'scripts/controllers/admin/approveDisagreeModalController.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/modal/confirmModalController.js',
                            'scripts/controllers/plan/planMainController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.epForAdminIndex', {
            url: '/epForAdminIndex',
            templateUrl: 'views/dashboard/enterpriseAdmin/epForAdminIndex.html',
            controller: 'EpForAdminIndexCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/enterpriseAdmin/epForAdminIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.epForAdminIndex.epForAdminList', {
            url: '/epForAdminList',
            templateUrl: 'views/dashboard/enterpriseAdmin/epForAdminList.html',
            controller: 'EpForAdminListCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/enterpriseAdmin/epForAdminListController.js',
                            'scripts/controllers/modal/promptModalController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.epForAdminIndex.epForAdminInfo', {
            url: '/epForAdminInfo',
            controller: 'EpForAdminInfoCtrl',
            templateUrl: 'views/dashboard/enterpriseAdmin/epForAdminInfo.html',
            params: {
                "epId": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/main.js',
                            'scripts/directives/timeline/timeline.js',
                            'scripts/directives/notifications/notifications.js',
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            
                            'scripts/directives/dashboard/stats/stats.js',
                            'styles/mine.css',
                            'scripts/controllers/enterpriseAdmin/epForAdminInfoController.js',
                            'scripts/controllers/modal/promptModalController.js',
                        ]
                    })
                }
            }
        })
        .state('dashboard.batchOperation', {
            url: '/batchOperation',
            controller: 'batchOperationController',
            templateUrl: 'views/dashboard/sysadmin/batchOperation.html',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/crypto-js/crypto-js.js',
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/sysadmin/batchOperationController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.czlicenseIndex', {
            url: '/czlicenseIndex',
            templateUrl: 'views/dashboard/sysadmin/czlicenseIndex.html',
            controller: 'CzLicenseIndexCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/sysadmin/czLicenseIndexController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.czlicenseIndex.czlicenseList', {
            url: '/czlicenseList',
            templateUrl: 'views/dashboard/sysadmin/czlicenseList.html',
            controller: 'CzLicenseListCtrl',
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'lib/dataTables/dataTables.bootstrap.min.css',
                            'lib/dataTables/dataTables.bootstrap.min.js',
                            'lib/dataTables/jquery.dataTables.min.css',
                            'lib/dataTables/jquery.dataTables.min.js',
                            'scripts/controllers/sysadmin/czLicenseListController.js'
                        ]
                    })
                }
            }
        })
        .state('dashboard.czlicenseIndex.czlicenseInfo', {
            url: '/czlicenseInfo',
            templateUrl: 'views/dashboard/sysadmin/czlicenseInfo.html',
            controller: 'CzLicenseInfoCtrl',
            params: {
                "epId": null,
                "from": null
            },
            resolve: {
                loadMyFiles: function ($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'sbAdminApp',
                        files: [
                            'scripts/controllers/modal/promptModalController.js',
                            'scripts/controllers/sysadmin/czLicenseInfoController.js'
                        ]
                    })
                }
            }
        })
    /* $httpProvider.interceptors.push(['$rootScope','$injector','$q',function($rootScope,$injector,$q){
     return {
     'request':function(config){
     return config;
     },
     'response': function (config) {
     if(angular.equals("POST",config.config.method) || angular.equals("post",config.config.method)  )
     {
     //如果想跳转页面，需注入$injector，再获取$state
     var $state = $injector.get('$state');
     //$state.go("login");
     console.log("response=====>>"+JSON.stringify($state.current));
     }
     return config;
     }
     };
     }]);*/
}]);
iwoboApp.run(['$state', '$rootScope', 'localStorageService', '$modal', '$log', 'Init', function ($state, $rootScope, localStorageService, $modal, $log, Init) {
    console.log("===========iwobo app running====================================");
    // $rootScope.baseUrl = 'http://lovewobo.com';
    $rootScope.baseUrl = 'http://localhost:9002/api';
    $rootScope.printUrl = 'http://localhost:9002/car/print/index.html';
    $rootScope.parkUrl = 'http://localhost:9002/car/park/index.html';
    // $rootScope.baseUrl = 'http://39.96.42.117:9000/api';
    // $rootScope.printUrl = 'http://39.96.42.117:9000/car/print/index.html';
    // $rootScope.parkUrl = 'http://39.96.42.117:9000/car/park/index.html';
    // $rootScope.baseUrl = 'http://192.168.1.120:9002/api';
    //$rootScope.baseUrl = 'http://60.30.64.249:7080/rd_2nd';
    $rootScope.websocketUrlController = 'ws://localhost:9002/mywebsocket';
    $rootScope.baseUrlPath = '';
    $rootScope.uuid = '';
    $rootScope.platform = "";
    $rootScope.logintitle = '';
    $rootScope.loginPic = '';
    $rootScope.userPortrait = '';
    $rootScope.ifLogin = '1';  //0-登录 1-未登录
    $rootScope.nickName = '';
    $rootScope.tel = '';
    $rootScope.mail = '';
    $rootScope.loginUrl = 'login';
    $rootScope.title = '管理面板';
    $rootScope.downFlag = true;
    $rootScope.downNum = 1;
    $rootScope.appId = '';
    $rootScope.appName = '请选择应用';
    $rootScope.APPS = new Array();
    $rootScope.logo = 'images/logo.png';
    //公司注册登录信息
    $rootScope.epName = "";
    $rootScope.epArea = "";
    $rootScope.epCode = "";
    //localStorageService.IWBSESSION = "";
    //时间控件是否点击
    $rootScope.dateClick = true;

    //页面按钮显示提示信息
    $rootScope.checkApp = function () {
        $('#element').popover('show');
    };
}]);

    
