---
title: Mocking DomSanitizer
description: Information how to test usage of DomSanitizer in Angular 
sidebar_label: Mocking DomSanitizer 
---

This article explains how to mock `DomSanitizer` in Angular tests properly.

The biggest issue is that `DomSanitizer` are used internally by Angular.
Therefore, mocking them can cause unpredictable errors such as:

- TypeError: view.root.sanitizer.sanitize is not a function
- TypeError: _co.domSanitizer.bypassSecurityTrustHtml is not a function

Another problem is that both of the class is abstract and there is no way to detect their abstract methods in javascript runtime
in order to provide mock functions or spies instead.

However, `ng-mocks` contains [`MockRender`](../api/MockRender.md) which supports additional providers for rendered things.
Therefore, if we use [`MockRender`](../api/MockRender.md) and [`MockProvider`](../api/MockProvider.md), we can achieve desired environment and behavior:

```ts
// rendering TargetComponent component
MockRender(TargetComponent, null, {
  // providing special overrides for TargetComponent
  providers: [
    // Mocking DomSanitizer with a fake method
    MockProvider(DomSanitizer, {
      // the override should be provided explicitly
      // because sanitize method is abstract
      sanitize: jasmine.createSpy('sanitize'),
    }),
  ],
});
```

Profit.

## Full example

A full example of **mocking DomSanitizer** in Angular tests.

- [Try it on StackBlitz](https://stackblitz.com/github/ng-mocks/examples?file=src/examples/MockSanitizer/test.spec.ts&initialpath=%3Fspec%3DMockSanitizer)
- [Try it on CodeSandbox](https://codesandbox.io/s/github/ng-mocks/examples?file=/src/examples/MockSanitizer/test.spec.ts&initialpath=%3Fspec%3DMockSanitizer)

```ts
describe('MockSanitizer', () => {
  beforeEach(() => MockBuilder(TargetComponent));

  it('renders expected mock values', () => {
    MockRender(TargetComponent, null, {
      providers: [
        MockProvider(DomSanitizer, {
          sanitize: (context: SecurityContext, value: string) =>
            `sanitized:${context}:${value.length}`,
        }),
      ],
    });

    expect(ngMocks.formatHtml(ngMocks.find('div')))
      .toEqual('sanitized:1:23');
  });
});
```