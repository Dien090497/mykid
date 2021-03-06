#import "AppDelegate.h"

#import <React/RCTBridge.h>
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <WebRTC/RTCAudioSessionConfiguration.h>

#import <Firebase.h>
#import <UserNotifications/UserNotifications.h>
#import <RNCPushNotificationIOS.h>

#ifdef FB_SONARKIT_ENABLED
#import <FlipperKit/FlipperClient.h>
#import <FlipperKitLayoutPlugin/FlipperKitLayoutPlugin.h>
#import <FlipperKitUserDefaultsPlugin/FKUserDefaultsPlugin.h>
#import <FlipperKitNetworkPlugin/FlipperKitNetworkPlugin.h>
#import <SKIOSNetworkPlugin/SKIOSNetworkAdapter.h>
#import <FlipperKitReactPlugin/FlipperKitReactPlugin.h>

static void InitializeFlipper(UIApplication *application) {
  FlipperClient *client = [FlipperClient sharedClient];
  SKDescriptorMapper *layoutDescriptorMapper = [[SKDescriptorMapper alloc] initWithDefaults];
  [client addPlugin:[[FlipperKitLayoutPlugin alloc] initWithRootNode:application withDescriptorMapper:layoutDescriptorMapper]];
  [client addPlugin:[[FKUserDefaultsPlugin alloc] initWithSuiteName:nil]];
  [client addPlugin:[FlipperKitReactPlugin new]];
  [client addPlugin:[[FlipperKitNetworkPlugin alloc] initWithNetworkAdapter:[SKIOSNetworkAdapter new]]];
  [client start];
}
#endif
#import <GoogleMaps/GoogleMaps.h>
@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [FIRApp configure];
  [GMSServices provideAPIKey:@"AIzaSyD58dDwEJtBbm_gjYQXjJftxVC9DD5UT-A"];
#ifdef FB_SONARKIT_ENABLED
  InitializeFlipper(application);
#endif

  RCTBridge *bridge = [[RCTBridge alloc] initWithDelegate:self launchOptions:launchOptions];
  
  RCTRootView *rootView = [[RCTRootView alloc] initWithBridge:bridge
                                                   moduleName:@"MyKid"
                                            initialProperties:nil];

  RTCAudioSessionConfiguration *webRTCConfiguration = [RTCAudioSessionConfiguration webRTCConfiguration];

  webRTCConfiguration.categoryOptions = (
     AVAudioSessionCategoryOptionAllowBluetooth |
    AVAudioSessionCategoryOptionDefaultToSpeaker | AVAudioSessionPortOverrideSpeaker
  );
  
  if (@available(iOS 13.0, *)) {
      rootView.backgroundColor = [UIColor systemBackgroundColor];
  } else {
      rootView.backgroundColor = [UIColor whiteColor];
  }

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  
  // Define UNUserNotificationCenter
  UNUserNotificationCenter *center = [UNUserNotificationCenter currentNotificationCenter];
  center.delegate = self;
  
//  [self voipRegistration];
  
  return YES;
}

// Register for VoIP notifications
//- (void) voipRegistration {
//  dispatch_queue_t mainQueue = dispatch_get_main_queue();
//  // Create a push registry object
//  PKPushRegistry * voipRegistry = [[PKPushRegistry alloc] initWithQueue: mainQueue];
//  // Set the registry's delegate to self
//  voipRegistry.delegate = self;
//  // Set the push type to VoIP
//  voipRegistry.desiredPushTypes = [NSSet setWithObject:PKPushTypeVoIP];
//}

- (NSURL *)sourceURLForBridge:(RCTBridge *)bridge
{
#if DEBUG
  return [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index" fallbackResource:nil];
#else
  return [[NSBundle mainBundle] URLForResource:@"main" withExtension:@"jsbundle"];
#endif
}
// Required for the register event.
- (void)application:(UIApplication *)application didRegisterForRemoteNotificationsWithDeviceToken:(NSData *)deviceToken
{
 [RNCPushNotificationIOS didRegisterForRemoteNotificationsWithDeviceToken:deviceToken];
}
//// Required for the notification event. You must call the completion handler after handling the remote notification.
- (void)application:(UIApplication *)application didReceiveRemoteNotification:(NSDictionary *)userInfo
fetchCompletionHandler:(void (^)(UIBackgroundFetchResult))completionHandler
{
//  NSString *callerName = @"V - Kid Pro is Calling";
//  NSString *callerId = [[[NSUUID UUID] UUIDString] lowercaseString];
//  NSString *handle = @"1234567890";
//  NSString *handleType = @"generic";
//  BOOL hasVideo = false;
//
//
//  @try {
//      NSDictionary *dataPayload = userInfo;
//
//      callerName = [dataPayload[@"body"] isKindOfClass:[NSString class]] ? dataPayload[@"body"] : @"V - Kid Pro is Calling";
//
//      callerId = [dataPayload[@"key"] isKindOfClass:[NSString class]] ?  dataPayload[@"key"] : [[[NSUUID UUID] UUIDString] lowercaseString];
//
//      handle = [dataPayload[@"handle"] isKindOfClass:[NSString class]] ?  dataPayload[@"handle"] : @"1234567890";
//
//      handleType = [dataPayload[@"handleType"] isKindOfClass:[NSString class]] ?  dataPayload[@"handleType"] : @"generic";
//
//      hasVideo = true;
//
//  } @catch (NSException *exception) {
//
//    NSLog(@"Error PushKit payload %@", exception);
//
//  } @finally {
//
//
//    NSLog(@"RNVoip caller id ===> %@    callerNAme  ==> %@ handle  ==> %@",callerId, callerName, hasVideo ? @"true": @"false");
//
//    NSDictionary *extra = userInfo;
//
//    [RNVoipCall reportNewIncomingCall:callerId handle:handle handleType:handleType hasVideo:hasVideo localizedCallerName:callerName fromPushKit: YES payload:extra withCompletionHandler:nil];
//
//    [RNVoipPushKit didReceiveIncomingPushWithPayload:userInfo forType:(NSString *)type];

//  }
//
  [RNCPushNotificationIOS didReceiveRemoteNotification:userInfo fetchCompletionHandler:completionHandler];
}
//// Required for the registrationError event.
//- (void)application:(UIApplication *)application didFailToRegisterForRemoteNotificationsWithError:(NSError *)error
//{
// [RNCPushNotificationIOS didFailToRegisterForRemoteNotificationsWithError:error];
//}
//// Required for localNotification event
//- (void)userNotificationCenter:(UNUserNotificationCenter *)center
//didReceiveNotificationResponse:(UNNotificationResponse *)response
//         withCompletionHandler:(void (^)(void))completionHandler
//{
//  [RNCPushNotificationIOS didReceiveNotificationResponse:response];
//}
////Called when a notification is delivered to a foreground app.
//-(void)userNotificationCenter:(UNUserNotificationCenter *)center willPresentNotification:(UNNotification *)notification withCompletionHandler:(void (^)(UNNotificationPresentationOptions options))completionHandler
//{
//  completionHandler(UNNotificationPresentationOptionSound | UNNotificationPresentationOptionAlert | UNNotificationPresentationOptionBadge);
//}
//
//
//// --- Handle updated push credentials
//- (void)pushRegistry:(PKPushRegistry *)registry didUpdatePushCredentials:(PKPushCredentials *)credentials forType:(PKPushType)type {
//  // Register VoIP push token (a property of PKPushCredentials) with server
//  [RNVoipPushKit didUpdatePushCredentials:credentials forType:(NSString *)type];
//}
//
//- (void)pushRegistry:(PKPushRegistry *)registry didInvalidatePushTokenForType:(PKPushType)type
//{
//  // --- The system calls this method when a previously provided push token is no longer valid for use. No action is necessary on your part to reregister the push type. Instead, use this method to notify your server not to send push notifications using the matching push token.
//}
//
//
//// --- Handle incoming pushes (for ios <= 10)
//- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type {
//   NSLog(@"Ajith");
//
//
//
//  [RNVoipPushKit didReceiveIncomingPushWithPayload:payload forType:(NSString *)type];
//}
//
//// --- Handle incoming pushes (for ios >= 11)
//- (void)pushRegistry:(PKPushRegistry *)registry didReceiveIncomingPushWithPayload:(PKPushPayload *)payload forType:(PKPushType)type withCompletionHandler:(void (^)(void))completion {
//
//
//
//  NSString *callerName = @"V - Kid Pro is Calling";
//  NSString *callerId = [[[NSUUID UUID] UUIDString] lowercaseString];
//  NSString *handle = @"1234567890";
//  NSString *handleType = @"generic";
//  BOOL hasVideo = false;
//
//
//  @try {
//    if([payload.dictionaryPayload[@"data"] isKindOfClass:[NSDictionary class]]){
//      NSDictionary *dataPayload = payload.dictionaryPayload[@"data"];
//
//      callerName = [dataPayload[@"name"] isKindOfClass:[NSString class]] ?  [NSString stringWithFormat: @"%@ is Calling", dataPayload[@"name"]] : @"V - Kid Pro is Calling";
//
//      callerId = [dataPayload[@"uuid"] isKindOfClass:[NSString class]] ?  dataPayload[@"uuid"] : [[[NSUUID UUID] UUIDString] lowercaseString];
//
//      handle = [dataPayload[@"handle"] isKindOfClass:[NSString class]] ?  dataPayload[@"handle"] : @"1234567890";
//
//      handleType = [dataPayload[@"handleType"] isKindOfClass:[NSString class]] ?  dataPayload[@"handleType"] : @"generic";
//
//      hasVideo = dataPayload[@"hasVideo"] ? true : false;
//
//    }
//  } @catch (NSException *exception) {
//
//    NSLog(@"Error PushKit payload %@", exception);
//
//  } @finally {
//
//
//    NSLog(@"RNVoip caller id ===> %@    callerNAme  ==> %@ handle  ==> %@",callerId, callerName, hasVideo ? @"true": @"false");
//
//    NSDictionary *extra = [payload.dictionaryPayload valueForKeyPath:@"data"];
//
//    [RNVoipCall reportNewIncomingCall:callerId handle:handle handleType:handleType hasVideo:hasVideo localizedCallerName:callerName fromPushKit: YES payload:extra withCompletionHandler:completion];
//
//    [RNVoipPushKit didReceiveIncomingPushWithPayload:payload forType:(NSString *)type];
//
//  }
//}

@end
