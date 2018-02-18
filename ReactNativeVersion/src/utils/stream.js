import { Observable } from 'rxjs';

export const createStreamFromPublisher = publisher =>
  Observable.create(observer => {
    this.gyroscopeSubscription = publisher.addListener(data =>
      observer.next(data)
    );
  });
