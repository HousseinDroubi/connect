abstract class AppResponses {
  abstract final String message;
  const AppResponses();
}

class AppSuccess extends AppResponses {
  @override
  final String message;
  const AppSuccess({this.message = "Done"});
}

class AppFailure extends AppResponses {
  @override
  final String message;
  const AppFailure({this.message = "Something went wrong"});
}
