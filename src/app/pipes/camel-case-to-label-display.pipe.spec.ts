import { CamelCaseToLabelDisplayPipe } from './camel-case-to-label-display.pipe';

describe('CamelCaseToLabelDisplayPipe', () => {
  it('create an instance', () => {
    const pipe = new CamelCaseToLabelDisplayPipe();
    expect(pipe).toBeTruthy();
  });
});
