
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
            localStorage.clear();
            $rootScope.userLogged = 0;
            $rootScope.$digest;
            $state.go('auth.walkthrough');
            //window.location.href = "#/";
        })
        .controller('SignupCtrl', function ($scope, $state, $http, $rootScope) {
            $scope.user = {};
            $scope.user.name = '';
            $scope.user.email = '';
            $scope.user.phone = '';
            $scope.user.password = '';
            $scope.doSignUp = function () {
                var data = "name=" + $scope.user.name + "&email=" + $scope.user.email + "&phone=" + $scope.user.phone + "&password=" + $scope.user.password;
                //var data = new FormData(jQuery("#signup")[0]);
                $.ajax({
                    type: 'GET',
                    url: domain + "dr-register",
                    data: data,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (response) {
                        console.log(response);
                        if (angular.isObject(response)) {
                            store(response);
                            $rootScope.userLogged = 1;
                            //if ($rootScope.url != '') {
                            if (window.localStorage.getItem('url') != null) {
                                $state.go(window.localStorage.getItem('url'));
                            } else {
                                $state.go('app.doctor-consultations');
                            }
                        } else {
                            alert('Please fill all the details for signup');
                        }
                        $rootScope.$digest;
                    },
                    error: function (e) {
                        console.log(e.responseText);
                    }
                });
            };
            //Check if email is already registered
            $scope.checkEmail = function (email) {
                $http({
                    method: 'GET',
                    url: domain + 'check-user-email',
                    params: {userEmail: email}
                }).then(function successCallback(response) {
                    if (response.data > 0) {
                        $scope.user.email = '';
                        $scope.emailError = "This email-id is already registered!";
                        $scope.emailError.digest;
                        //alert("This email-id already registered");
                    } else {
                        $scope.emailError = "";
                        $scope.emailError.digest;
                    }
                }, function errorCallback(response) {
                    console.log(response);
                });
            };
        })

        .controller('ForgotPasswordCtrl', function ($scope, $state) {
            $scope.recoverPassword = function () {
                $state.go('app.feeds-categories');
            };

            $scope.user = {};
        })

        .controller('DoctorConsultationsCtrl', function ($scope, $http, $stateParams) {
            $scope.drId = get('id');
            $http({
                method: 'GET',
                url: domain + 'appointment/get-patient-details',
                params: {id: $scope.drId}
            }).then(function successCallback(response) {
                console.log(response.data);
                $scope.appointments = response.data.appointments;
                $scope.usersData = response.data.usersData;
                $scope.products = response.data.products;
            }, function errorCallback(e) {
                console.log(e);
            });
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

            }, function errorCallback(e) {
                console.log(e);
            });
        })

        .controller('FilterCtrl', function ($scope, $http, $stateParams) {
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
                $scope.oToken = response.data.oToken;
                var apiKey = '45463682';
                var sessionId = $scope.app[0].appointments.opentok_session_id;
                var token = $scope.oToken;
                var session = OT.initSession(apiKey, sessionId);
                session.on({
                    streamCreated: function (event) {
                        session.subscribe(event.stream, 'subscribersDiv', {insertMode: 'append'});
                    }
                });
                session.connect(token, function (error) {
                    if (error) {
                        console.log(error.message);
                    } else {
                        session.publish('myPublisherDiv', {width: 130, height: 110});
                    }
                });
            }, function errorCallback(e) {
                console.log(e);
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
                }
                );
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
