import { MockDirectiveResolver } from '@angular/compiler/testing';
import { Component, Directive } from '@angular/core';

import coreReflectBodyCatch from './core.reflect.body-catch';
import coreReflectBodyGlobal from './core.reflect.body-global';

const coreReflectDirective = coreReflectBodyGlobal(MockDirectiveResolver);

export default (def: any): Directive & Partial<Component> =>
  coreReflectBodyCatch((arg: any) => coreReflectDirective().resolve(arg))(def);
