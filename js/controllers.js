
angular.module('your_app_name.controllers', [])

        .controller('AuthCtrl', function ($scope, $state, $ionicConfig, $rootScope) {
            if ($rootScope.userLogged == 0)
                $state.go('auth.login');
        })

// APP
        .controller('AppCtrl', function ($scope, $state, $ionicConfig, $rootScope) {
            if ($rootScope.userLogged == 0)
                $state.go('auth.login');
        })

        .controller('EvaluationCtrl', function ($scope, $http, $stateParams, $ionicModal) {
            $scope.category_sources = [];
            $scope.categoryId = $stateParams.categoryId;
        })



        .controller('PlaintestCtrl', function ($scope, $ionicModal) {
            $ionicModal.fromTemplateUrl('addeval', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.submitmodal = function () {
                $scope.modal.hide();
            };
        })

        .controller('SnowmedtCtrl', function ($scope, $ionicModal) {
            $ionicModal.fromTemplateUrl('snomed', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.submitmodal = function () {
                $scope.modal.hide();
            };
        })

        .controller('IcdCtrl', function ($scope, $ionicModal) {
            $ionicModal.fromTemplateUrl('icd', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.submitmodal = function () {
                $scope.modal.hide();
            };
        })

        .controller('AddrelationCtrl', function ($scope, $ionicModal) {
            $ionicModal.fromTemplateUrl('addrelation', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.submitmodal = function () {
                $scope.modal.hide();
            };

        })



        .controller('PlaintestCtrl', function ($scope, $ionicModal) {
            $ionicModal.fromTemplateUrl('addeval', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.submitmodal = function () {
                $scope.modal.hide();
            };
        })

        .controller('SnowmedtCtrl', function ($scope, $ionicModal) {
            $ionicModal.fromTemplateUrl('snomed', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.submitmodal = function () {
                $scope.modal.hide();
            };
        })


        .controller('LoincCtrl', function ($scope, $ionicModal) {
            $ionicModal.fromTemplateUrl('loinc', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.submitmodal = function () {
                $scope.modal.hide();
            };
        })









        .controller('IcdCtrl', function ($scope, $ionicModal) {
            $ionicModal.fromTemplateUrl('icd', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.submitmodal = function () {
                $scope.modal.hide();
            };
        })

        .controller('AddrelationCtrl', function ($scope, $ionicModal) {
            $ionicModal.fromTemplateUrl('addrelation', {
                scope: $scope
            }).then(function (modal) {
                $scope.modal = modal;
            });

            $scope.submitmodal = function () {
                $scope.modal.hide();
            };
        })

        .controller('ConsultationsNoteCtrl', function ($scope, $http, $stateParams) {
            $scope.category_sources = [];
            $scope.categoryId = $stateParams.categoryId;



        })
//LOGIN
        .controller('LoginCtrl', function ($scope, $state, $templateCache, $q, $rootScope) {
            $scope.doLogIn = function () {
                var data = new FormData(jQuery("#loginuser")[0]);
                $.ajax({
                    type: 'POST',
                    url: domain + "chk-dr-user",
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        //console.log(response);
                        if (angular.isObject(response)) {
                            $scope.loginError = '';
                            $scope.loginError.digest;
                            store(response);
                            $rootScope.userLogged = 1;
                            $rootScope.username = response.fname;
                            //if ($rootScope.url != '') {
                            if (window.localStorage.getItem('url') != null) {
                                $state.go(window.localStorage.getItem('url'));
                            } else {
                                $state.go('app.doctor-consultations');
                            }
                        } else {
                            $rootScope.userLogged = 0;
                            $scope.loginError = response;
                            $scope.loginError.digest;
                            //alert(response);
                        }
                        $rootScope.$digest;
                    },
                    error: function (e) {
                        console.log(e.responseText);
                    }
                });
            };
            $scope.user = {};
            $scope.user.email = "";
            $scope.user.pin = "";
            // We need this for the form validation
            $scope.selected_tab = "";
            $scope.$on('my-tabs-changed', function (event, data) {
                $scope.selected_tab = data.title;
            });
        })

        .controller('LogoutCtrl', function ($scope, $state, $templateCache, $q, $rootScope) {
            window.localStorage.clear();
            $rootScope.userLogged = 0;
            $rootScope.$digest;
            $state.go('auth.walkthrough');
            //window.location.href = "#/";
        })

        .controller('DoctorConsultationsCtrl', function ($scope, $http, $stateParams, $filter, $ionicPopup, $timeout) {
            $scope.drId = get('id');
            $http({
                method: 'GET',
                url: domain + 'appointment/get-patient-details',
                params: {id: $scope.drId}
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.todays_app = response.data.todays_appointments;
                $scope.todays_usersData = response.data.todays_usersData;
                $scope.todays_products = response.data.todays_products;
                $scope.todays_time = response.data.todays_time;
                $scope.week_app = response.data.week_appointments;
                $scope.week_usersData = response.data.week_usersData;
                $scope.week_products = response.data.week_products;
                $scope.week_time = response.data.week_time;
                $scope.all_app = response.data.all_appointments;
                $scope.all_usersData = response.data.all_usersData;
                $scope.all_products = response.data.all_products;
                $scope.all_time = response.data.all_time;
            }, function errorCallback(e) {
                console.log(e);
            });
            $scope.cancelAppointment = function (appId, drId, mode, startTime) {
                $scope.appId = appId;
                $scope.userId = get('id');
                console.log(startTime);
                var curtime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                console.log(curtime);
                var timeDiff = getTimeDiff(startTime, curtime);
                console.log(timeDiff);
                if (timeDiff < 15) {
                    if (mode == 1) {
                        alert("Appointment can not be cancelled now!");
                    } else {
                        //ask 4 options
                        /*$http({
                         method: 'GET',
                         url: domain + 'appointment/dr-cancel-app',
                         params: {appId: $scope.appId, prodId: $scope.prodid, userId: $scope.userId}
                         }).then(function successCallback(response) {
                         console.log(response.data);
                         if (response.data == 'success') {
                         alert('Your appointment is cancelled successfully.');
                         } else {
                         alert('Sorry your appointment is not cancelled.');
                         }
                         $state.go('app.consultations-list');
                         }, function errorCallback(response) {
                         console.log(response);
                         });*/
                    }
                } else {
                    if (mode == 1) {
                        $http({
                            method: 'GET',
                            url: domain + 'appointment/dr-cancel-app',
                            params: {appId: $scope.appId, prodId: $scope.prodid, userId: $scope.userId}
                        }).then(function successCallback(response) {
                            console.log(response.data);
                            if (response.data == 'success') {
                                alert('Your appointment is cancelled successfully.');
                            } else {
                                alert('Sorry your appointment is not cancelled.');
                            }
                            $state.go('app.consultations-list');
                        }, function errorCallback(response) {
                            console.log(response);
                        });
                    } else if (mode == 3 || mode == 4) {
                        //ask for 4 options
                    }
                }
            };

            $scope.showAlert = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert Box',
                    template: '<ion-checkbox ng-model="filter.snomed1">Snomed1</ion-checkbox><ion-checkbox ng-model="filter.snomed2">Snomed2</ion-checkbox><ion-checkbox ng-model="filter.snomed3">Snomed3</ion-checkbox>'
                });

                alertPopup.then(function (res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            };



        })

        .controller('DoctorCurrentTabCtrl', function ($scope, $http, $stateParams) {
            $scope.appId = $stateParams.id;
            $scope.drId = get('id');
            $http({
                method: 'GET',
                url: domain + 'appointment/get-patient-app-details',
                params: {id: $scope.appId, drId: $scope.drId}
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.app = response.data.app;
                $scope.user = response.data.userData;
                $scope.products = response.data.products;
                $scope.time = response.data.time;

            }, function errorCallback(e) {
                console.log(e);
            });
            $scope.cancelAppointment = function (appId, drId, mode, startTime) {
                $scope.appId = appId;
                $scope.userId = get('id');
                console.log(startTime);
                var curtime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                console.log(curtime);
                var timeDiff = getTimeDiff(startTime, curtime);
                console.log(timeDiff);
                if (timeDiff < 15) {
                    if (mode == 1) {
                        alert("Appointment can not be cancelled now!");
                    } else {
                        //ask 4 options
                        /*$http({
                         method: 'GET',
                         url: domain + 'appointment/dr-cancel-app',
                         params: {appId: $scope.appId, prodId: $scope.prodid, userId: $scope.userId}
                         }).then(function successCallback(response) {
                         console.log(response.data);
                         if (response.data == 'success') {
                         alert('Your appointment is cancelled successfully.');
                         } else {
                         alert('Sorry your appointment is not cancelled.');
                         }
                         $state.go('app.consultations-list');
                         }, function errorCallback(response) {
                         console.log(response);
                         });*/
                    }
                } else {
                    if (mode == 1) {
                        $http({
                            method: 'GET',
                            url: domain + 'appointment/dr-cancel-app',
                            params: {appId: $scope.appId, prodId: $scope.prodid, userId: $scope.userId}
                        }).then(function successCallback(response) {
                            console.log(response.data);
                            if (response.data == 'success') {
                                alert('Your appointment is cancelled successfully.');
                            } else {
                                alert('Sorry your appointment is not cancelled.');
                            }
                            $state.go('app.consultations-list');
                        }, function errorCallback(response) {
                            console.log(response);
                        });
                    } else if (mode == 3 || mode == 4) {
                        //ask for 4 options
                    }
                }
            };
        })

        .controller('FilterCtrl', function ($scope, $http, $stateParams) {
            $scope.category_sources = [];
            $scope.categoryId = $stateParams.categoryId;
        })

        .controller('DiagnosisCtrl', function ($scope, $http, $stateParams) {
            $scope.category_sources = [];
            $scope.categoryId = $stateParams.categoryId;
        })


        .controller('TreatmentPlanCtrl', function ($scope, $http, $stateParams) {
            $scope.category_sources = [];
            $scope.categoryId = $stateParams.categoryId;
        })



        .controller('DoctorJoinCtrl', function ($scope, $http, $stateParams) {
            $scope.appId = $stateParams.id;
            $scope.userId = get('id');
            $http({
                method: 'GET',
                url: domain + 'appointment/join-patient',
                params: {id: $scope.appId, userId: $scope.userId}
            }).then(function sucessCallback(response) {
                console.log(response.data);
                $scope.user = response.data.user;
                $scope.app = response.data.app;
                //$scope.oToken = "https://test.doctrs.in/opentok/opentok?session=" + response.data.app[0].appointments.opentok_session_id;
                var apiKey = '45463682';
                var sessionId = response.data.app[0].appointments.opentok_session_id;
                var token = response.data.oToken;
                var session = OT.initSession(apiKey, sessionId);
                session.on({
                    streamCreated: function (event) {
                        session.subscribe(event.stream, 'subscribersDiv', {width: "100%", height: "100%"});
                    }
                });
                session.connect(token, function (error) {
                    if (error) {
                        console.log(error.message);
                    } else {
                        session.publish('myPublisherDiv', {width: "30%", height: "30%"});
                    }
                });
            }, function errorCallback(e) {
                console.log(e);
            });
        })

        .controller('DoctorChatAppsCtrl', function ($scope, $http, $stateParams, $filter, $ionicPopup, $timeout) {
            $scope.drId = get('id');
            $http({
                method: 'GET',
                url: domain + 'appointment/get-chat-patient-details',
                params: {id: $scope.drId}
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.todays_app = response.data.todays_appointments;
                $scope.todays_usersData = response.data.todays_usersData;
                $scope.todays_products = response.data.todays_products;
                $scope.todays_time = response.data.todays_time;
                $scope.week_app = response.data.week_appointments;
                $scope.week_usersData = response.data.week_usersData;
                $scope.week_products = response.data.week_products;
                $scope.week_time = response.data.week_time;
                $scope.all_app = response.data.all_appointments;
                $scope.all_usersData = response.data.all_usersData;
                $scope.all_products = response.data.all_products;
                $scope.all_time = response.data.all_time;
            }, function errorCallback(e) {
                console.log(e);
            });
            $scope.cancelAppointment = function (appId, drId, mode, startTime) {
                $scope.appId = appId;
                $scope.userId = get('id');
                console.log(startTime);
                var curtime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
                console.log(curtime);
                var timeDiff = getTimeDiff(startTime, curtime);
                console.log(timeDiff);
                if (timeDiff < 15) {
                    if (mode == 1) {
                        alert("Appointment can not be cancelled now!");
                    } else {
                        //ask 4 options
                        /*$http({
                         method: 'GET',
                         url: domain + 'appointment/dr-cancel-app',
                         params: {appId: $scope.appId, prodId: $scope.prodid, userId: $scope.userId}
                         }).then(function successCallback(response) {
                         console.log(response.data);
                         if (response.data == 'success') {
                         alert('Your appointment is cancelled successfully.');
                         } else {
                         alert('Sorry your appointment is not cancelled.');
                         }
                         $state.go('app.consultations-list');
                         }, function errorCallback(response) {
                         console.log(response);
                         });*/
                    }
                } else {
                    if (mode == 1) {
                        $http({
                            method: 'GET',
                            url: domain + 'appointment/dr-cancel-app',
                            params: {appId: $scope.appId, prodId: $scope.prodid, userId: $scope.userId}
                        }).then(function successCallback(response) {
                            console.log(response.data);
                            if (response.data == 'success') {
                                alert('Your appointment is cancelled successfully.');
                            } else {
                                alert('Sorry your appointment is not cancelled.');
                            }
                            $state.go('app.consultations-list');
                        }, function errorCallback(response) {
                            console.log(response);
                        });
                    } else if (mode == 3 || mode == 4) {
                        //ask for 4 options
                    }
                }
            };

            $scope.showAlert = function () {
                var alertPopup = $ionicPopup.alert({
                    title: 'Alert Box',
                    template: '<ion-checkbox ng-model="filter.snomed1">Snomed1</ion-checkbox><ion-checkbox ng-model="filter.snomed2">Snomed2</ion-checkbox><ion-checkbox ng-model="filter.snomed3">Snomed3</ion-checkbox>'
                });

                alertPopup.then(function (res) {
                    console.log('Thank you for not eating my delicious ice cream cone');
                });
            };



        })
        .controller('CurrentChatCtrl', function ($scope, $http, $stateParams, $filter) {
            $scope.appId = $stateParams.id;
            $scope.drId = get('id');
            $http({
                method: 'GET',
                url: domain + 'appointment/get-patient-current-chat',
                params: {id: $scope.appId, drId: $scope.drId}
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.app = response.data.app;
                $scope.user = response.data.userData;
                $scope.products = response.data.products;
                $scope.time = response.data.time;

            }, function errorCallback(e) {
                console.log(e);
            });
        })
        .controller('JoinChatCtrl', function ($scope, $http, $stateParams, $sce, $filter) {
            $scope.curTime = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm:ss');
            $scope.appId = $stateParams.id;
            $scope.mode = $stateParams.mode;
            $scope.userId = get('id');
            $scope.msgs = {};
            $http({
                method: 'GET',
                url: domain + 'chat/doctor-join-chat',
                params: {id: $scope.appId, userId: $scope.userId, mode: $scope.mode}
            }).then(function sucessCallback(response) {
                console.log(response.data);
                $scope.user = response.data.user;
                $scope.app = response.data.app;
                $scope.msgs = response.data.chat;
                //$scope.oToken = "https://test.doctrs.in/opentok/opentok?session=" + response.data.app[0].appointments.opentok_session_id;
                var apiKey = '45463682';
                var sessionId = response.data.app[0].appointments.opentok_session_id;
                var token = response.data.oToken;
                var session = OT.initSession(apiKey, sessionId);
                session.connect(token, function (error) {
                    if (error) {
                        console.log("Error connecting: ", error.code, error.message);
                    } else {
                        console.log("Connected to the session.");
                    }
                });
                session.on("signal", function (event) {
                    console.log("Signal sent from connection " + event.from.id);
                    $('#subscribersDiv').append(event.data);
                });
                $scope.send = function () {
                    session.signal({data: jQuery("[name='msg']").val()},
                            function (error) {
                                if (error) {
                                    console.log("signal error ("
                                            + error.code
                                            + "): " + error.message);
                                } else {
                                    var msg = jQuery("[name='msg']").val();
                                    $http({
                                        method: 'GET',
                                        url: domain + 'chat/add-patient-chat',
                                        params: {from: $scope.userId, to: $scope.user[0].id, msg: msg}
                                    }).then(function sucessCallback(response) {
                                        console.log(response);
                                        jQuery("[name='msg']").val('');
                                    }, function errorCallback(e) {
                                        console.log(e.responseText);
                                    });
                                    console.log("signal sent.");
                                }
                            }
                    );
                };
            }, function errorCallback(e) {
                console.log(e.responseText);
            });
        })
        .controller('ImagePickerCtrl', function ($scope, $rootScope, $cordovaCamera) {
            $scope.images = [];
            $scope.selImages = function () {
                window.imagePicker.getPictures(
                        function (results) {
                            for (var i = 0; i < results.length; i++) {
                                console.log('Image URI: ' + results[i]);
                                $scope.images.push(results[i]);
                            }
                            if (!$scope.$$phase) {
                                $scope.$apply();
                            }
                        }, function (error) {
                    console.log('Error: ' + error);
                });
            };
            $scope.removeImage = function (image) {
                $scope.images = _.without($scope.images, image);
            };
            $scope.shareImage = function (image) {
                window.plugins.socialsharing.share(null, null, image);
            };
            $scope.shareAll = function () {
                window.plugins.socialsharing.share(null, null, $scope.images);
            };
        })

        ;
