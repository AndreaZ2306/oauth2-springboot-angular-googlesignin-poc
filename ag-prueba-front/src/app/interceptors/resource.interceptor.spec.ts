import { TestBed } from '@angular/core/testing';
import { ResourceInterceptor } from './resource.interceptor';
import { TokenService } from '../services/token.service';

describe('ResourceInterceptor', () => {
  let interceptor: ResourceInterceptor;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ResourceInterceptor,
        {
          provide: TokenService,
          useValue: {
            getAccessToken: () => null, // stub sencillo para el test
          },
        },
      ],
    });

    interceptor = TestBed.inject(ResourceInterceptor);
  });

  it('should be created', () => {
    expect(interceptor).toBeTruthy();
  });
});
