import { Test, TestingModule } from '@nestjs/testing';
import { PrepaymentResolver } from './prepayment.resolver';

describe('PrepaymentResolver', () => {
  let resolver: PrepaymentResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PrepaymentResolver],
    }).compile();

    resolver = module.get<PrepaymentResolver>(PrepaymentResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
