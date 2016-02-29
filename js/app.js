// Ionic Starter App
var domain = "http://stage.doctrs.in/";
//var domain = "http://192.168.2.169/doctors/";
angular.module('underscore', [])
        .factory('_', function () {
            return window._; // assumes underscore has already been loaded on the page
        });

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('your_app_name', [
    'ionic',
    'angularMoment',
    'your_app_name.controllers',
    'your_app_name.directives',
    'your_app_name.filters',
    'your_app_name.services',
    'your_app_name.factories',
    'your_app_name.config',
    'underscore',
    'ngMap',
    'ngResource',
    'ngCordova',
    'slugifier',
    'ionic.contrib.ui.tinderCards',
    'youtube-embed'
])
        .run(function ($ionicPlatform, PushNotificationsService, $rootScope, $ionicConfig, $timeout, $ionicLoading) {

            $ionicPlatform.on("deviceready", function () {
                // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
                // for form inputs)
                if (window.cordova && window.cordova.plugins.Keyboard) {
                    cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
                }
                if (window.StatusBar) {
                    StatusBar.styleDefault();
                }

                PushNotificationsService.register();
            });
            $rootScope.$on('loading:show', function () {
                $ionicLoading.show({template: 'Loading'})
            })

            $rootScope.$on('loading:hide', function () {
                $ionicLoading.hide()
            })
            // This fixes transitions for transparent background views
            $rootScope.$on("$stateChangeStart", function (event, toState, toParams, fromState, fromParams) {
                if (toState.name.indexOf('auth.walkthrough') > -1)
                {
                    // set transitions to android to avoid weird visual effect in the walkthrough transitions
                    $timeout(function () {
                        $ionicConfig.views.transition('android');
                        $ionicConfig.views.swipeBackEnabled(false);
                        console.log("setting transition to android and disabling swipe back");
                    }, 0);
                }
            });
            $rootScope.$on("$stateChangeSuccess", function (event, toState, toParams, fromState, fromParams) {
                if (toState.name.indexOf('app.feeds-categories') > -1)
                {
                    // Restore platform default transition. We are just hardcoding android transitions to auth views.
                    $ionicConfig.views.transition('platform');
                    // If it's ios, then enable swipe back again
                    if (ionic.Platform.isIOS())
                    {
                        $ionicConfig.views.swipeBackEnabled(true);
                    }
                    console.log("enabling swipe back and restoring transition to platform default", $ionicConfig.views.transition());
                }
            });

            $ionicPlatform.on("resume", function () {
                PushNotificationsService.register();
            });

        })


        .config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider, $httpProvider) {
            $httpProvider.interceptors.push(function ($rootScope) {
                return {
                    request: function (config) {
                        $rootScope.$broadcast('loading:show')
                        return config
                    },
                    response: function (response) {
                        $rootScope.$broadcast('loading:hide')
                        return response
                    }
                }
            })

            $stateProvider

                    //INTRO
                    .state('auth', {
                        url: "/auth",
                        templateUrl: "views/auth/auth.html",
                        abstract: true,
                        controller: 'AuthCtrl'
                    })

                    .state('auth.walkthrough', {
                        url: '/walkthrough',
                        templateUrl: "views/auth/walkthrough.html"
                    })

                    .state('auth.login', {
                        url: '/login',
                        templateUrl: "views/auth/login.html",
                        controller: 'LoginCtrl'
                    })

                    .state('auth.signup', {
                        url: '/signup',
                        templateUrl: "views/auth/signup.html",
                        controller: 'SignupCtrl'
                    })

                    .state('auth.forgot-password', {
                        url: "/forgot-password",
                        templateUrl: "views/auth/forgot-password.html",
                        controller: 'ForgotPasswordCtrl'
                    })

                    .state('app', {
                        url: "/app",
                        abstract: true,
                        templateUrl: "views/app/side-menu.html",
                        controller: 'AppCtrl'
                    })

                    .state('app.image-picker', {
                        url: "/miscellaneous/image-picker",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/miscellaneous/image-picker.html",
                                controller: 'ImagePickerCtrl'
                            }
                        }
                    })

                    .state('app.slider', {
                        url: "/layouts/slider",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/layouts/slider.html"
                            }
                        }
                    })

                    //FEEDS
                    .state('app.feeds-categories', {
                        url: "/feeds-categories",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/feeds-categories.html",
                                controller: 'FeedsCategoriesCtrl'
                            }
                        }
                    })

					 .state('app.doctor-settings', {
						 cache: false,
                        url: "/doctor-settings",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/doctor-settings.html",
                                controller: 'DoctorSettingsCtrl'
                            }
                        }
                    })
					
                    .state('app.doctor-consultations', {
                        cache: false,
                        url: "/doctor-consultations",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/doctor-consultations.html",
                                controller: 'DoctorConsultationsCtrl'
                            }
                        }
                    })
					
				 .state('app.consultation-past', {
                        url: "/consultations/past",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultations/consultations-past.html",
                                controller: 'DoctorConsultationsCtrl'
                            }
                        }
                    })
					
					
                    .state('app.chat-appointments', {
                        cache: false,
                        url: "/chat-appointments",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/chat-appointments.html",
                                controller: 'DoctorChatAppsCtrl'
                            }
                        }
                    })

                    .state('app.consultations-note', {
                        url: "/consultations-note",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultations-note.html",
                                controller: 'ConsultationsNoteCtrl'
                            }
                        }
                    })

			
					.state('app.about', {
                        url: "/consultation-note/about",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/about.html",
                                controller: 'ConsultationsNoteCtrl'
                            }
                        }
                    })
			
					.state('app.patient-history', {
                        url: "/consultation-note/patient-history",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/patient-history.html",
                                controller: 'ConsultationsNoteCtrl'
                            }
                        }
                    })
					
						.state('app.family-history', {
                        url: "/consultation-note/family-history",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/family-history.html",
                                controller: 'ConsultationsNoteCtrl'
                            }
                        }
                    })
					
					.state('app.measurement', {
                        url: "/consultation-note/measurement",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/measurement.html",
                                controller: 'ConsultationsNoteCtrl'
                            }
                        }
                    })
					.state('app.observation', {
                        url: "/consultation-note/observation",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/observation.html",
                                controller: 'ConsultationsNoteCtrl'
                            }
                        }
                    })
					
					.state('app.testresult', {
                        url: "/consultation-note/testresult",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/testresult.html",
                                controller: 'ConsultationsNoteCtrl'
                            }
                        }
                    })
					.state('app.investigations', {
                        url: "/consultation-note/investigations",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/investigations.html",
                                controller: 'ConsultationsNoteCtrl'
                            }
                        }
                    })
					
					.state('app.medication', {
                        url: "/consultation-note/medication",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/medication.html",
                                controller: 'ConsultationsNoteCtrl'
                            }
                        }
                    })	
					
					.state('app.procedure', {
                        url: "/consultation-note/procedure",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/consultation-note/procedure.html",
                                controller: 'ConsultationsNoteCtrl'
                            }
                        }
                    })
					
					
					
					
					
					
					
					
					
					
                    .state('app.evaluation', {
                        url: "/evaluation",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/evaluation.html",
                                controller: 'EvaluationCtrl'
                            }
                        }
                    })

                    .state('app.diagnosis', {
                        url: "/diagnosis",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/diagnosis.html",
                                controller: 'DiagnosisCtrl'
                            }
                        }
                    })


                    .state('app.treatment-plan', {
                        url: "/treatmentplan",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/treatment-plan.html",
                                controller: 'TreatmentPlanCtrl'
                            }
                        }
                    })

                    .state('app.treatment-plan-list', {
                        url: "/treatmentplan-list",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/treatment-plan-list.html",
                                controller: 'TreatmentPlanListCtrl'
                            }
                        }
                    })

                    .state('app.doctor-current-tab', {
                        url: "/doctor-current-tab/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/doctor-current-tab.html",
                                controller: 'DoctorCurrentTabCtrl'
                            }
                        }
                    })

                    .state('app.doctor-join', {
                        cache: false,
                        url: "/doctor-join/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/doctor-join.html",
                                controller: 'DoctorJoinCtrl'
                            }
                        }
                    })
                    .state('app.current-chat', {
                        cache: false,
                        url: "/current-chat/{id:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/current-chat.html",
                                controller: 'CurrentChatCtrl'
                            }
                        }
                    })
                    .state('app.join-chat', {
                        url: "/join-chat/{id:int}/{mode:int}",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/join-chat.html",
                                controller: 'JoinChatCtrl'
                            }
                        }
                    })

                    .state('app.patient-chat', {
                        url: "/patient-chat",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/patient-chat.html",
                                controller: 'PatientChatCtrl'
                            }
                        }
                    })



                    .state('app.feed-entries', {
                        url: "/feed-entries/:categoryId/:sourceId",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/feeds/feed-entries.html",
                                controller: 'FeedEntriesCtrl'
                            }
                        }
                    })


                    .state('app.homepage', {
                        url: "/homepage",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/homepage.html",
                                controller: 'HomepageCtrl'
                            }
                        }
                    })

                    .state('app.patient-list', {
                        url: "/patient-list",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/patient-list.html",
                                controller: 'PatientListCtrl'
                            }
                        }
                    })

                    .state('app.patient', {
                        url: "/patient",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/patient.html",
                                controller: 'PatientCtrl'
                            }
                        }
                    })

                    .state('app.patient-record', {
                        url: "/patient-record",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/patient-record.html",
                                controller: 'PatientRecordCtrl'
                            }
                        }
                    })

                    .state('app.patient-consult', {
                        url: "/patient-consult",
                        views: {
                            'menuContent': {
                                templateUrl: "views/app/patient-consult.html",
                                controller: 'PatientConsultCtrl'
                            }
                        }
                    })




                    .state('app.logout', {
                        url: "/logout",
                        views: {
                            'menuContent': {
                                //templateUrl: "views/app/bookmarks.html",
                                controller: 'AppCtrl'
                            }
                        }
                    })
                    ;
            // if none of the above states are matched, use this as the fallback
            $urlRouterProvider.otherwise('/auth/walkthrough');
        });
