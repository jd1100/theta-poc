(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global = global || self, global.Theta = factory());
}(this, (function () {
	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	function commonjsRequire () {
		throw new Error('Dynamic requires are not currently supported by rollup-plugin-commonjs');
	}

	function unwrapExports (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	function createCommonjsModule(fn, module) {
		return module = { exports: {} }, fn(module, module.exports), module.exports;
	}

	function getCjsExportFromNamespace (n) {
		return n && n['default'] || n;
	}

	var check = function (it) {
	  return it && it.Math == Math && it;
	};

	// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
	var global_1 =
	  // eslint-disable-next-line no-undef
	  check(typeof globalThis == 'object' && globalThis) ||
	  check(typeof window == 'object' && window) ||
	  check(typeof self == 'object' && self) ||
	  check(typeof commonjsGlobal == 'object' && commonjsGlobal) ||
	  // eslint-disable-next-line no-new-func
	  Function('return this')();

	var fails = function (exec) {
	  try {
	    return !!exec();
	  } catch (error) {
	    return true;
	  }
	};

	// Thank's IE8 for his funny defineProperty
	var descriptors = !fails(function () {
	  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
	});

	var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
	var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// Nashorn ~ JDK8 bug
	var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

	// `Object.prototype.propertyIsEnumerable` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
	var f = NASHORN_BUG ? function propertyIsEnumerable(V) {
	  var descriptor = getOwnPropertyDescriptor(this, V);
	  return !!descriptor && descriptor.enumerable;
	} : nativePropertyIsEnumerable;

	var objectPropertyIsEnumerable = {
		f: f
	};

	var createPropertyDescriptor = function (bitmap, value) {
	  return {
	    enumerable: !(bitmap & 1),
	    configurable: !(bitmap & 2),
	    writable: !(bitmap & 4),
	    value: value
	  };
	};

	var toString = {}.toString;

	var classofRaw = function (it) {
	  return toString.call(it).slice(8, -1);
	};

	var split = ''.split;

	// fallback for non-array-like ES3 and non-enumerable old V8 strings
	var indexedObject = fails(function () {
	  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
	  // eslint-disable-next-line no-prototype-builtins
	  return !Object('z').propertyIsEnumerable(0);
	}) ? function (it) {
	  return classofRaw(it) == 'String' ? split.call(it, '') : Object(it);
	} : Object;

	// `RequireObjectCoercible` abstract operation
	// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
	var requireObjectCoercible = function (it) {
	  if (it == undefined) throw TypeError("Can't call method on " + it);
	  return it;
	};

	// toObject with fallback for non-array-like ES3 strings



	var toIndexedObject = function (it) {
	  return indexedObject(requireObjectCoercible(it));
	};

	var isObject = function (it) {
	  return typeof it === 'object' ? it !== null : typeof it === 'function';
	};

	// `ToPrimitive` abstract operation
	// https://tc39.github.io/ecma262/#sec-toprimitive
	// instead of the ES6 spec version, we didn't implement @@toPrimitive case
	// and the second argument - flag - preferred type is a string
	var toPrimitive = function (input, PREFERRED_STRING) {
	  if (!isObject(input)) return input;
	  var fn, val;
	  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
	  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
	  throw TypeError("Can't convert object to primitive value");
	};

	var hasOwnProperty = {}.hasOwnProperty;

	var has = function (it, key) {
	  return hasOwnProperty.call(it, key);
	};

	var document$1 = global_1.document;
	// typeof document.createElement is 'object' in old IE
	var EXISTS = isObject(document$1) && isObject(document$1.createElement);

	var documentCreateElement = function (it) {
	  return EXISTS ? document$1.createElement(it) : {};
	};

	// Thank's IE8 for his funny defineProperty
	var ie8DomDefine = !descriptors && !fails(function () {
	  return Object.defineProperty(documentCreateElement('div'), 'a', {
	    get: function () { return 7; }
	  }).a != 7;
	});

	var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

	// `Object.getOwnPropertyDescriptor` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
	var f$1 = descriptors ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
	  O = toIndexedObject(O);
	  P = toPrimitive(P, true);
	  if (ie8DomDefine) try {
	    return nativeGetOwnPropertyDescriptor(O, P);
	  } catch (error) { /* empty */ }
	  if (has(O, P)) return createPropertyDescriptor(!objectPropertyIsEnumerable.f.call(O, P), O[P]);
	};

	var objectGetOwnPropertyDescriptor = {
		f: f$1
	};

	var anObject = function (it) {
	  if (!isObject(it)) {
	    throw TypeError(String(it) + ' is not an object');
	  } return it;
	};

	var nativeDefineProperty = Object.defineProperty;

	// `Object.defineProperty` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperty
	var f$2 = descriptors ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
	  anObject(O);
	  P = toPrimitive(P, true);
	  anObject(Attributes);
	  if (ie8DomDefine) try {
	    return nativeDefineProperty(O, P, Attributes);
	  } catch (error) { /* empty */ }
	  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
	  if ('value' in Attributes) O[P] = Attributes.value;
	  return O;
	};

	var objectDefineProperty = {
		f: f$2
	};

	var createNonEnumerableProperty = descriptors ? function (object, key, value) {
	  return objectDefineProperty.f(object, key, createPropertyDescriptor(1, value));
	} : function (object, key, value) {
	  object[key] = value;
	  return object;
	};

	var setGlobal = function (key, value) {
	  try {
	    createNonEnumerableProperty(global_1, key, value);
	  } catch (error) {
	    global_1[key] = value;
	  } return value;
	};

	var SHARED = '__core-js_shared__';
	var store = global_1[SHARED] || setGlobal(SHARED, {});

	var sharedStore = store;

	var functionToString = Function.toString;

	// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
	if (typeof sharedStore.inspectSource != 'function') {
	  sharedStore.inspectSource = function (it) {
	    return functionToString.call(it);
	  };
	}

	var inspectSource = sharedStore.inspectSource;

	var WeakMap = global_1.WeakMap;

	var nativeWeakMap = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));

	var shared = createCommonjsModule(function (module) {
	(module.exports = function (key, value) {
	  return sharedStore[key] || (sharedStore[key] = value !== undefined ? value : {});
	})('versions', []).push({
	  version: '3.6.1',
	  mode:  'global',
	  copyright: 'Â© 2019 Denis Pushkarev (zloirock.ru)'
	});
	});

	var id = 0;
	var postfix = Math.random();

	var uid = function (key) {
	  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
	};

	var keys = shared('keys');

	var sharedKey = function (key) {
	  return keys[key] || (keys[key] = uid(key));
	};

	var hiddenKeys = {};

	var WeakMap$1 = global_1.WeakMap;
	var set, get, has$1;

	var enforce = function (it) {
	  return has$1(it) ? get(it) : set(it, {});
	};

	var getterFor = function (TYPE) {
	  return function (it) {
	    var state;
	    if (!isObject(it) || (state = get(it)).type !== TYPE) {
	      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
	    } return state;
	  };
	};

	if (nativeWeakMap) {
	  var store$1 = new WeakMap$1();
	  var wmget = store$1.get;
	  var wmhas = store$1.has;
	  var wmset = store$1.set;
	  set = function (it, metadata) {
	    wmset.call(store$1, it, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return wmget.call(store$1, it) || {};
	  };
	  has$1 = function (it) {
	    return wmhas.call(store$1, it);
	  };
	} else {
	  var STATE = sharedKey('state');
	  hiddenKeys[STATE] = true;
	  set = function (it, metadata) {
	    createNonEnumerableProperty(it, STATE, metadata);
	    return metadata;
	  };
	  get = function (it) {
	    return has(it, STATE) ? it[STATE] : {};
	  };
	  has$1 = function (it) {
	    return has(it, STATE);
	  };
	}

	var internalState = {
	  set: set,
	  get: get,
	  has: has$1,
	  enforce: enforce,
	  getterFor: getterFor
	};

	var redefine = createCommonjsModule(function (module) {
	var getInternalState = internalState.get;
	var enforceInternalState = internalState.enforce;
	var TEMPLATE = String(String).split('String');

	(module.exports = function (O, key, value, options) {
	  var unsafe = options ? !!options.unsafe : false;
	  var simple = options ? !!options.enumerable : false;
	  var noTargetGet = options ? !!options.noTargetGet : false;
	  if (typeof value == 'function') {
	    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
	    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
	  }
	  if (O === global_1) {
	    if (simple) O[key] = value;
	    else setGlobal(key, value);
	    return;
	  } else if (!unsafe) {
	    delete O[key];
	  } else if (!noTargetGet && O[key]) {
	    simple = true;
	  }
	  if (simple) O[key] = value;
	  else createNonEnumerableProperty(O, key, value);
	// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
	})(Function.prototype, 'toString', function toString() {
	  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
	});
	});

	var path = global_1;

	var aFunction = function (variable) {
	  return typeof variable == 'function' ? variable : undefined;
	};

	var getBuiltIn = function (namespace, method) {
	  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global_1[namespace])
	    : path[namespace] && path[namespace][method] || global_1[namespace] && global_1[namespace][method];
	};

	var ceil = Math.ceil;
	var floor = Math.floor;

	// `ToInteger` abstract operation
	// https://tc39.github.io/ecma262/#sec-tointeger
	var toInteger = function (argument) {
	  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
	};

	var min = Math.min;

	// `ToLength` abstract operation
	// https://tc39.github.io/ecma262/#sec-tolength
	var toLength = function (argument) {
	  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
	};

	var max = Math.max;
	var min$1 = Math.min;

	// Helper for a popular repeating case of the spec:
	// Let integer be ? ToInteger(index).
	// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
	var toAbsoluteIndex = function (index, length) {
	  var integer = toInteger(index);
	  return integer < 0 ? max(integer + length, 0) : min$1(integer, length);
	};

	// `Array.prototype.{ indexOf, includes }` methods implementation
	var createMethod = function (IS_INCLUDES) {
	  return function ($this, el, fromIndex) {
	    var O = toIndexedObject($this);
	    var length = toLength(O.length);
	    var index = toAbsoluteIndex(fromIndex, length);
	    var value;
	    // Array#includes uses SameValueZero equality algorithm
	    // eslint-disable-next-line no-self-compare
	    if (IS_INCLUDES && el != el) while (length > index) {
	      value = O[index++];
	      // eslint-disable-next-line no-self-compare
	      if (value != value) return true;
	    // Array#indexOf ignores holes, Array#includes - not
	    } else for (;length > index; index++) {
	      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
	    } return !IS_INCLUDES && -1;
	  };
	};

	var arrayIncludes = {
	  // `Array.prototype.includes` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
	  includes: createMethod(true),
	  // `Array.prototype.indexOf` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
	  indexOf: createMethod(false)
	};

	var indexOf = arrayIncludes.indexOf;


	var objectKeysInternal = function (object, names) {
	  var O = toIndexedObject(object);
	  var i = 0;
	  var result = [];
	  var key;
	  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
	  // Don't enum bug & hidden keys
	  while (names.length > i) if (has(O, key = names[i++])) {
	    ~indexOf(result, key) || result.push(key);
	  }
	  return result;
	};

	// IE8- don't enum bug keys
	var enumBugKeys = [
	  'constructor',
	  'hasOwnProperty',
	  'isPrototypeOf',
	  'propertyIsEnumerable',
	  'toLocaleString',
	  'toString',
	  'valueOf'
	];

	var hiddenKeys$1 = enumBugKeys.concat('length', 'prototype');

	// `Object.getOwnPropertyNames` method
	// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	var f$3 = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
	  return objectKeysInternal(O, hiddenKeys$1);
	};

	var objectGetOwnPropertyNames = {
		f: f$3
	};

	var f$4 = Object.getOwnPropertySymbols;

	var objectGetOwnPropertySymbols = {
		f: f$4
	};

	// all object keys, includes non-enumerable and symbols
	var ownKeys = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
	  var keys = objectGetOwnPropertyNames.f(anObject(it));
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
	};

	var copyConstructorProperties = function (target, source) {
	  var keys = ownKeys(source);
	  var defineProperty = objectDefineProperty.f;
	  var getOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	  for (var i = 0; i < keys.length; i++) {
	    var key = keys[i];
	    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
	  }
	};

	var replacement = /#|\.prototype\./;

	var isForced = function (feature, detection) {
	  var value = data[normalize(feature)];
	  return value == POLYFILL ? true
	    : value == NATIVE ? false
	    : typeof detection == 'function' ? fails(detection)
	    : !!detection;
	};

	var normalize = isForced.normalize = function (string) {
	  return String(string).replace(replacement, '.').toLowerCase();
	};

	var data = isForced.data = {};
	var NATIVE = isForced.NATIVE = 'N';
	var POLYFILL = isForced.POLYFILL = 'P';

	var isForced_1 = isForced;

	var getOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;






	/*
	  options.target      - name of the target object
	  options.global      - target is the global object
	  options.stat        - export as static methods of target
	  options.proto       - export as prototype methods of target
	  options.real        - real prototype method for the `pure` version
	  options.forced      - export even if the native feature is available
	  options.bind        - bind methods to the target, required for the `pure` version
	  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
	  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
	  options.sham        - add a flag to not completely full polyfills
	  options.enumerable  - export as enumerable property
	  options.noTargetGet - prevent calling a getter on target
	*/
	var _export = function (options, source) {
	  var TARGET = options.target;
	  var GLOBAL = options.global;
	  var STATIC = options.stat;
	  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
	  if (GLOBAL) {
	    target = global_1;
	  } else if (STATIC) {
	    target = global_1[TARGET] || setGlobal(TARGET, {});
	  } else {
	    target = (global_1[TARGET] || {}).prototype;
	  }
	  if (target) for (key in source) {
	    sourceProperty = source[key];
	    if (options.noTargetGet) {
	      descriptor = getOwnPropertyDescriptor$1(target, key);
	      targetProperty = descriptor && descriptor.value;
	    } else targetProperty = target[key];
	    FORCED = isForced_1(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
	    // contained in target
	    if (!FORCED && targetProperty !== undefined) {
	      if (typeof sourceProperty === typeof targetProperty) continue;
	      copyConstructorProperties(sourceProperty, targetProperty);
	    }
	    // add a flag to not completely full polyfills
	    if (options.sham || (targetProperty && targetProperty.sham)) {
	      createNonEnumerableProperty(sourceProperty, 'sham', true);
	    }
	    // extend global
	    redefine(target, key, sourceProperty, options);
	  }
	};

	// `ToObject` abstract operation
	// https://tc39.github.io/ecma262/#sec-toobject
	var toObject = function (argument) {
	  return Object(requireObjectCoercible(argument));
	};

	// `IsArray` abstract operation
	// https://tc39.github.io/ecma262/#sec-isarray
	var isArray = Array.isArray || function isArray(arg) {
	  return classofRaw(arg) == 'Array';
	};

	var nativeSymbol = !!Object.getOwnPropertySymbols && !fails(function () {
	  // Chrome 38 Symbol has incorrect toString conversion
	  // eslint-disable-next-line no-undef
	  return !String(Symbol());
	});

	var useSymbolAsUid = nativeSymbol
	  // eslint-disable-next-line no-undef
	  && !Symbol.sham
	  // eslint-disable-next-line no-undef
	  && typeof Symbol.iterator == 'symbol';

	var WellKnownSymbolsStore = shared('wks');
	var Symbol$1 = global_1.Symbol;
	var createWellKnownSymbol = useSymbolAsUid ? Symbol$1 : Symbol$1 && Symbol$1.withoutSetter || uid;

	var wellKnownSymbol = function (name) {
	  if (!has(WellKnownSymbolsStore, name)) {
	    if (nativeSymbol && has(Symbol$1, name)) WellKnownSymbolsStore[name] = Symbol$1[name];
	    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
	  } return WellKnownSymbolsStore[name];
	};

	var SPECIES = wellKnownSymbol('species');

	// `ArraySpeciesCreate` abstract operation
	// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
	var arraySpeciesCreate = function (originalArray, length) {
	  var C;
	  if (isArray(originalArray)) {
	    C = originalArray.constructor;
	    // cross-realm fallback
	    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
	    else if (isObject(C)) {
	      C = C[SPECIES];
	      if (C === null) C = undefined;
	    }
	  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
	};

	var createProperty = function (object, key, value) {
	  var propertyKey = toPrimitive(key);
	  if (propertyKey in object) objectDefineProperty.f(object, propertyKey, createPropertyDescriptor(0, value));
	  else object[propertyKey] = value;
	};

	var userAgent = getBuiltIn('navigator', 'userAgent') || '';

	var process$1 = global_1.process;
	var versions = process$1 && process$1.versions;
	var v8 = versions && versions.v8;
	var match, version;

	if (v8) {
	  match = v8.split('.');
	  version = match[0] + match[1];
	} else if (userAgent) {
	  match = userAgent.match(/Edge\/(\d+)/);
	  if (!match || match[1] >= 74) {
	    match = userAgent.match(/Chrome\/(\d+)/);
	    if (match) version = match[1];
	  }
	}

	var v8Version = version && +version;

	var SPECIES$1 = wellKnownSymbol('species');

	var arrayMethodHasSpeciesSupport = function (METHOD_NAME) {
	  // We can't use this feature detection in V8 since it causes
	  // deoptimization and serious performance degradation
	  // https://github.com/zloirock/core-js/issues/677
	  return v8Version >= 51 || !fails(function () {
	    var array = [];
	    var constructor = array.constructor = {};
	    constructor[SPECIES$1] = function () {
	      return { foo: 1 };
	    };
	    return array[METHOD_NAME](Boolean).foo !== 1;
	  });
	};

	var max$1 = Math.max;
	var min$2 = Math.min;
	var MAX_SAFE_INTEGER = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_LENGTH_EXCEEDED = 'Maximum allowed length exceeded';

	// `Array.prototype.splice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.splice
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('splice') }, {
	  splice: function splice(start, deleteCount /* , ...items */) {
	    var O = toObject(this);
	    var len = toLength(O.length);
	    var actualStart = toAbsoluteIndex(start, len);
	    var argumentsLength = arguments.length;
	    var insertCount, actualDeleteCount, A, k, from, to;
	    if (argumentsLength === 0) {
	      insertCount = actualDeleteCount = 0;
	    } else if (argumentsLength === 1) {
	      insertCount = 0;
	      actualDeleteCount = len - actualStart;
	    } else {
	      insertCount = argumentsLength - 2;
	      actualDeleteCount = min$2(max$1(toInteger(deleteCount), 0), len - actualStart);
	    }
	    if (len + insertCount - actualDeleteCount > MAX_SAFE_INTEGER) {
	      throw TypeError(MAXIMUM_ALLOWED_LENGTH_EXCEEDED);
	    }
	    A = arraySpeciesCreate(O, actualDeleteCount);
	    for (k = 0; k < actualDeleteCount; k++) {
	      from = actualStart + k;
	      if (from in O) createProperty(A, k, O[from]);
	    }
	    A.length = actualDeleteCount;
	    if (insertCount < actualDeleteCount) {
	      for (k = actualStart; k < len - actualDeleteCount; k++) {
	        from = k + actualDeleteCount;
	        to = k + insertCount;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	      for (k = len; k > len - actualDeleteCount + insertCount; k--) delete O[k - 1];
	    } else if (insertCount > actualDeleteCount) {
	      for (k = len - actualDeleteCount; k > actualStart; k--) {
	        from = k + actualDeleteCount - 1;
	        to = k + insertCount - 1;
	        if (from in O) O[to] = O[from];
	        else delete O[to];
	      }
	    }
	    for (k = 0; k < insertCount; k++) {
	      O[k + actualStart] = arguments[k + 2];
	    }
	    O.length = len - actualDeleteCount + insertCount;
	    return A;
	  }
	});

	var runtime_1 = createCommonjsModule(function (module) {
	/**
	 * Copyright (c) 2014-present, Facebook, Inc.
	 *
	 * This source code is licensed under the MIT license found in the
	 * LICENSE file in the root directory of this source tree.
	 */

	var runtime = (function (exports) {

	  var Op = Object.prototype;
	  var hasOwn = Op.hasOwnProperty;
	  var undefined$1; // More compressible than void 0.
	  var $Symbol = typeof Symbol === "function" ? Symbol : {};
	  var iteratorSymbol = $Symbol.iterator || "@@iterator";
	  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
	  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

	  function wrap(innerFn, outerFn, self, tryLocsList) {
	    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
	    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
	    var generator = Object.create(protoGenerator.prototype);
	    var context = new Context(tryLocsList || []);

	    // The ._invoke method unifies the implementations of the .next,
	    // .throw, and .return methods.
	    generator._invoke = makeInvokeMethod(innerFn, self, context);

	    return generator;
	  }
	  exports.wrap = wrap;

	  // Try/catch helper to minimize deoptimizations. Returns a completion
	  // record like context.tryEntries[i].completion. This interface could
	  // have been (and was previously) designed to take a closure to be
	  // invoked without arguments, but in all the cases we care about we
	  // already have an existing method we want to call, so there's no need
	  // to create a new function object. We can even get away with assuming
	  // the method takes exactly one argument, since that happens to be true
	  // in every case, so we don't have to touch the arguments object. The
	  // only additional allocation required is the completion record, which
	  // has a stable shape and so hopefully should be cheap to allocate.
	  function tryCatch(fn, obj, arg) {
	    try {
	      return { type: "normal", arg: fn.call(obj, arg) };
	    } catch (err) {
	      return { type: "throw", arg: err };
	    }
	  }

	  var GenStateSuspendedStart = "suspendedStart";
	  var GenStateSuspendedYield = "suspendedYield";
	  var GenStateExecuting = "executing";
	  var GenStateCompleted = "completed";

	  // Returning this object from the innerFn has the same effect as
	  // breaking out of the dispatch switch statement.
	  var ContinueSentinel = {};

	  // Dummy constructor functions that we use as the .constructor and
	  // .constructor.prototype properties for functions that return Generator
	  // objects. For full spec compliance, you may wish to configure your
	  // minifier not to mangle the names of these two functions.
	  function Generator() {}
	  function GeneratorFunction() {}
	  function GeneratorFunctionPrototype() {}

	  // This is a polyfill for %IteratorPrototype% for environments that
	  // don't natively support it.
	  var IteratorPrototype = {};
	  IteratorPrototype[iteratorSymbol] = function () {
	    return this;
	  };

	  var getProto = Object.getPrototypeOf;
	  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
	  if (NativeIteratorPrototype &&
	      NativeIteratorPrototype !== Op &&
	      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
	    // This environment has a native %IteratorPrototype%; use it instead
	    // of the polyfill.
	    IteratorPrototype = NativeIteratorPrototype;
	  }

	  var Gp = GeneratorFunctionPrototype.prototype =
	    Generator.prototype = Object.create(IteratorPrototype);
	  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
	  GeneratorFunctionPrototype.constructor = GeneratorFunction;
	  GeneratorFunctionPrototype[toStringTagSymbol] =
	    GeneratorFunction.displayName = "GeneratorFunction";

	  // Helper for defining the .next, .throw, and .return methods of the
	  // Iterator interface in terms of a single ._invoke method.
	  function defineIteratorMethods(prototype) {
	    ["next", "throw", "return"].forEach(function(method) {
	      prototype[method] = function(arg) {
	        return this._invoke(method, arg);
	      };
	    });
	  }

	  exports.isGeneratorFunction = function(genFun) {
	    var ctor = typeof genFun === "function" && genFun.constructor;
	    return ctor
	      ? ctor === GeneratorFunction ||
	        // For the native GeneratorFunction constructor, the best we can
	        // do is to check its .name property.
	        (ctor.displayName || ctor.name) === "GeneratorFunction"
	      : false;
	  };

	  exports.mark = function(genFun) {
	    if (Object.setPrototypeOf) {
	      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
	    } else {
	      genFun.__proto__ = GeneratorFunctionPrototype;
	      if (!(toStringTagSymbol in genFun)) {
	        genFun[toStringTagSymbol] = "GeneratorFunction";
	      }
	    }
	    genFun.prototype = Object.create(Gp);
	    return genFun;
	  };

	  // Within the body of any async function, `await x` is transformed to
	  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
	  // `hasOwn.call(value, "__await")` to determine if the yielded value is
	  // meant to be awaited.
	  exports.awrap = function(arg) {
	    return { __await: arg };
	  };

	  function AsyncIterator(generator) {
	    function invoke(method, arg, resolve, reject) {
	      var record = tryCatch(generator[method], generator, arg);
	      if (record.type === "throw") {
	        reject(record.arg);
	      } else {
	        var result = record.arg;
	        var value = result.value;
	        if (value &&
	            typeof value === "object" &&
	            hasOwn.call(value, "__await")) {
	          return Promise.resolve(value.__await).then(function(value) {
	            invoke("next", value, resolve, reject);
	          }, function(err) {
	            invoke("throw", err, resolve, reject);
	          });
	        }

	        return Promise.resolve(value).then(function(unwrapped) {
	          // When a yielded Promise is resolved, its final value becomes
	          // the .value of the Promise<{value,done}> result for the
	          // current iteration.
	          result.value = unwrapped;
	          resolve(result);
	        }, function(error) {
	          // If a rejected Promise was yielded, throw the rejection back
	          // into the async generator function so it can be handled there.
	          return invoke("throw", error, resolve, reject);
	        });
	      }
	    }

	    var previousPromise;

	    function enqueue(method, arg) {
	      function callInvokeWithMethodAndArg() {
	        return new Promise(function(resolve, reject) {
	          invoke(method, arg, resolve, reject);
	        });
	      }

	      return previousPromise =
	        // If enqueue has been called before, then we want to wait until
	        // all previous Promises have been resolved before calling invoke,
	        // so that results are always delivered in the correct order. If
	        // enqueue has not been called before, then it is important to
	        // call invoke immediately, without waiting on a callback to fire,
	        // so that the async generator function has the opportunity to do
	        // any necessary setup in a predictable way. This predictability
	        // is why the Promise constructor synchronously invokes its
	        // executor callback, and why async functions synchronously
	        // execute code before the first await. Since we implement simple
	        // async functions in terms of async generators, it is especially
	        // important to get this right, even though it requires care.
	        previousPromise ? previousPromise.then(
	          callInvokeWithMethodAndArg,
	          // Avoid propagating failures to Promises returned by later
	          // invocations of the iterator.
	          callInvokeWithMethodAndArg
	        ) : callInvokeWithMethodAndArg();
	    }

	    // Define the unified helper method that is used to implement .next,
	    // .throw, and .return (see defineIteratorMethods).
	    this._invoke = enqueue;
	  }

	  defineIteratorMethods(AsyncIterator.prototype);
	  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
	    return this;
	  };
	  exports.AsyncIterator = AsyncIterator;

	  // Note that simple async functions are implemented on top of
	  // AsyncIterator objects; they just return a Promise for the value of
	  // the final result produced by the iterator.
	  exports.async = function(innerFn, outerFn, self, tryLocsList) {
	    var iter = new AsyncIterator(
	      wrap(innerFn, outerFn, self, tryLocsList)
	    );

	    return exports.isGeneratorFunction(outerFn)
	      ? iter // If outerFn is a generator, return the full iterator.
	      : iter.next().then(function(result) {
	          return result.done ? result.value : iter.next();
	        });
	  };

	  function makeInvokeMethod(innerFn, self, context) {
	    var state = GenStateSuspendedStart;

	    return function invoke(method, arg) {
	      if (state === GenStateExecuting) {
	        throw new Error("Generator is already running");
	      }

	      if (state === GenStateCompleted) {
	        if (method === "throw") {
	          throw arg;
	        }

	        // Be forgiving, per 25.3.3.3.3 of the spec:
	        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
	        return doneResult();
	      }

	      context.method = method;
	      context.arg = arg;

	      while (true) {
	        var delegate = context.delegate;
	        if (delegate) {
	          var delegateResult = maybeInvokeDelegate(delegate, context);
	          if (delegateResult) {
	            if (delegateResult === ContinueSentinel) continue;
	            return delegateResult;
	          }
	        }

	        if (context.method === "next") {
	          // Setting context._sent for legacy support of Babel's
	          // function.sent implementation.
	          context.sent = context._sent = context.arg;

	        } else if (context.method === "throw") {
	          if (state === GenStateSuspendedStart) {
	            state = GenStateCompleted;
	            throw context.arg;
	          }

	          context.dispatchException(context.arg);

	        } else if (context.method === "return") {
	          context.abrupt("return", context.arg);
	        }

	        state = GenStateExecuting;

	        var record = tryCatch(innerFn, self, context);
	        if (record.type === "normal") {
	          // If an exception is thrown from innerFn, we leave state ===
	          // GenStateExecuting and loop back for another invocation.
	          state = context.done
	            ? GenStateCompleted
	            : GenStateSuspendedYield;

	          if (record.arg === ContinueSentinel) {
	            continue;
	          }

	          return {
	            value: record.arg,
	            done: context.done
	          };

	        } else if (record.type === "throw") {
	          state = GenStateCompleted;
	          // Dispatch the exception by looping back around to the
	          // context.dispatchException(context.arg) call above.
	          context.method = "throw";
	          context.arg = record.arg;
	        }
	      }
	    };
	  }

	  // Call delegate.iterator[context.method](context.arg) and handle the
	  // result, either by returning a { value, done } result from the
	  // delegate iterator, or by modifying context.method and context.arg,
	  // setting context.delegate to null, and returning the ContinueSentinel.
	  function maybeInvokeDelegate(delegate, context) {
	    var method = delegate.iterator[context.method];
	    if (method === undefined$1) {
	      // A .throw or .return when the delegate iterator has no .throw
	      // method always terminates the yield* loop.
	      context.delegate = null;

	      if (context.method === "throw") {
	        // Note: ["return"] must be used for ES3 parsing compatibility.
	        if (delegate.iterator["return"]) {
	          // If the delegate iterator has a return method, give it a
	          // chance to clean up.
	          context.method = "return";
	          context.arg = undefined$1;
	          maybeInvokeDelegate(delegate, context);

	          if (context.method === "throw") {
	            // If maybeInvokeDelegate(context) changed context.method from
	            // "return" to "throw", let that override the TypeError below.
	            return ContinueSentinel;
	          }
	        }

	        context.method = "throw";
	        context.arg = new TypeError(
	          "The iterator does not provide a 'throw' method");
	      }

	      return ContinueSentinel;
	    }

	    var record = tryCatch(method, delegate.iterator, context.arg);

	    if (record.type === "throw") {
	      context.method = "throw";
	      context.arg = record.arg;
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    var info = record.arg;

	    if (! info) {
	      context.method = "throw";
	      context.arg = new TypeError("iterator result is not an object");
	      context.delegate = null;
	      return ContinueSentinel;
	    }

	    if (info.done) {
	      // Assign the result of the finished delegate to the temporary
	      // variable specified by delegate.resultName (see delegateYield).
	      context[delegate.resultName] = info.value;

	      // Resume execution at the desired location (see delegateYield).
	      context.next = delegate.nextLoc;

	      // If context.method was "throw" but the delegate handled the
	      // exception, let the outer generator proceed normally. If
	      // context.method was "next", forget context.arg since it has been
	      // "consumed" by the delegate iterator. If context.method was
	      // "return", allow the original .return call to continue in the
	      // outer generator.
	      if (context.method !== "return") {
	        context.method = "next";
	        context.arg = undefined$1;
	      }

	    } else {
	      // Re-yield the result returned by the delegate method.
	      return info;
	    }

	    // The delegate iterator is finished, so forget it and continue with
	    // the outer generator.
	    context.delegate = null;
	    return ContinueSentinel;
	  }

	  // Define Generator.prototype.{next,throw,return} in terms of the
	  // unified ._invoke helper method.
	  defineIteratorMethods(Gp);

	  Gp[toStringTagSymbol] = "Generator";

	  // A Generator should always return itself as the iterator object when the
	  // @@iterator function is called on it. Some browsers' implementations of the
	  // iterator prototype chain incorrectly implement this, causing the Generator
	  // object to not be returned from this call. This ensures that doesn't happen.
	  // See https://github.com/facebook/regenerator/issues/274 for more details.
	  Gp[iteratorSymbol] = function() {
	    return this;
	  };

	  Gp.toString = function() {
	    return "[object Generator]";
	  };

	  function pushTryEntry(locs) {
	    var entry = { tryLoc: locs[0] };

	    if (1 in locs) {
	      entry.catchLoc = locs[1];
	    }

	    if (2 in locs) {
	      entry.finallyLoc = locs[2];
	      entry.afterLoc = locs[3];
	    }

	    this.tryEntries.push(entry);
	  }

	  function resetTryEntry(entry) {
	    var record = entry.completion || {};
	    record.type = "normal";
	    delete record.arg;
	    entry.completion = record;
	  }

	  function Context(tryLocsList) {
	    // The root entry object (effectively a try statement without a catch
	    // or a finally block) gives us a place to store values thrown from
	    // locations where there is no enclosing try statement.
	    this.tryEntries = [{ tryLoc: "root" }];
	    tryLocsList.forEach(pushTryEntry, this);
	    this.reset(true);
	  }

	  exports.keys = function(object) {
	    var keys = [];
	    for (var key in object) {
	      keys.push(key);
	    }
	    keys.reverse();

	    // Rather than returning an object with a next method, we keep
	    // things simple and return the next function itself.
	    return function next() {
	      while (keys.length) {
	        var key = keys.pop();
	        if (key in object) {
	          next.value = key;
	          next.done = false;
	          return next;
	        }
	      }

	      // To avoid creating an additional object, we just hang the .value
	      // and .done properties off the next function object itself. This
	      // also ensures that the minifier will not anonymize the function.
	      next.done = true;
	      return next;
	    };
	  };

	  function values(iterable) {
	    if (iterable) {
	      var iteratorMethod = iterable[iteratorSymbol];
	      if (iteratorMethod) {
	        return iteratorMethod.call(iterable);
	      }

	      if (typeof iterable.next === "function") {
	        return iterable;
	      }

	      if (!isNaN(iterable.length)) {
	        var i = -1, next = function next() {
	          while (++i < iterable.length) {
	            if (hasOwn.call(iterable, i)) {
	              next.value = iterable[i];
	              next.done = false;
	              return next;
	            }
	          }

	          next.value = undefined$1;
	          next.done = true;

	          return next;
	        };

	        return next.next = next;
	      }
	    }

	    // Return an iterator with no values.
	    return { next: doneResult };
	  }
	  exports.values = values;

	  function doneResult() {
	    return { value: undefined$1, done: true };
	  }

	  Context.prototype = {
	    constructor: Context,

	    reset: function(skipTempReset) {
	      this.prev = 0;
	      this.next = 0;
	      // Resetting context._sent for legacy support of Babel's
	      // function.sent implementation.
	      this.sent = this._sent = undefined$1;
	      this.done = false;
	      this.delegate = null;

	      this.method = "next";
	      this.arg = undefined$1;

	      this.tryEntries.forEach(resetTryEntry);

	      if (!skipTempReset) {
	        for (var name in this) {
	          // Not sure about the optimal order of these conditions:
	          if (name.charAt(0) === "t" &&
	              hasOwn.call(this, name) &&
	              !isNaN(+name.slice(1))) {
	            this[name] = undefined$1;
	          }
	        }
	      }
	    },

	    stop: function() {
	      this.done = true;

	      var rootEntry = this.tryEntries[0];
	      var rootRecord = rootEntry.completion;
	      if (rootRecord.type === "throw") {
	        throw rootRecord.arg;
	      }

	      return this.rval;
	    },

	    dispatchException: function(exception) {
	      if (this.done) {
	        throw exception;
	      }

	      var context = this;
	      function handle(loc, caught) {
	        record.type = "throw";
	        record.arg = exception;
	        context.next = loc;

	        if (caught) {
	          // If the dispatched exception was caught by a catch block,
	          // then let that catch block handle the exception normally.
	          context.method = "next";
	          context.arg = undefined$1;
	        }

	        return !! caught;
	      }

	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        var record = entry.completion;

	        if (entry.tryLoc === "root") {
	          // Exception thrown outside of any try block that could handle
	          // it, so set the completion value of the entire function to
	          // throw the exception.
	          return handle("end");
	        }

	        if (entry.tryLoc <= this.prev) {
	          var hasCatch = hasOwn.call(entry, "catchLoc");
	          var hasFinally = hasOwn.call(entry, "finallyLoc");

	          if (hasCatch && hasFinally) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            } else if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else if (hasCatch) {
	            if (this.prev < entry.catchLoc) {
	              return handle(entry.catchLoc, true);
	            }

	          } else if (hasFinally) {
	            if (this.prev < entry.finallyLoc) {
	              return handle(entry.finallyLoc);
	            }

	          } else {
	            throw new Error("try statement without catch or finally");
	          }
	        }
	      }
	    },

	    abrupt: function(type, arg) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc <= this.prev &&
	            hasOwn.call(entry, "finallyLoc") &&
	            this.prev < entry.finallyLoc) {
	          var finallyEntry = entry;
	          break;
	        }
	      }

	      if (finallyEntry &&
	          (type === "break" ||
	           type === "continue") &&
	          finallyEntry.tryLoc <= arg &&
	          arg <= finallyEntry.finallyLoc) {
	        // Ignore the finally entry if control is not jumping to a
	        // location outside the try/catch block.
	        finallyEntry = null;
	      }

	      var record = finallyEntry ? finallyEntry.completion : {};
	      record.type = type;
	      record.arg = arg;

	      if (finallyEntry) {
	        this.method = "next";
	        this.next = finallyEntry.finallyLoc;
	        return ContinueSentinel;
	      }

	      return this.complete(record);
	    },

	    complete: function(record, afterLoc) {
	      if (record.type === "throw") {
	        throw record.arg;
	      }

	      if (record.type === "break" ||
	          record.type === "continue") {
	        this.next = record.arg;
	      } else if (record.type === "return") {
	        this.rval = this.arg = record.arg;
	        this.method = "return";
	        this.next = "end";
	      } else if (record.type === "normal" && afterLoc) {
	        this.next = afterLoc;
	      }

	      return ContinueSentinel;
	    },

	    finish: function(finallyLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.finallyLoc === finallyLoc) {
	          this.complete(entry.completion, entry.afterLoc);
	          resetTryEntry(entry);
	          return ContinueSentinel;
	        }
	      }
	    },

	    "catch": function(tryLoc) {
	      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
	        var entry = this.tryEntries[i];
	        if (entry.tryLoc === tryLoc) {
	          var record = entry.completion;
	          if (record.type === "throw") {
	            var thrown = record.arg;
	            resetTryEntry(entry);
	          }
	          return thrown;
	        }
	      }

	      // The context.catch method must only be called with a location
	      // argument that corresponds to a known catch block.
	      throw new Error("illegal catch attempt");
	    },

	    delegateYield: function(iterable, resultName, nextLoc) {
	      this.delegate = {
	        iterator: values(iterable),
	        resultName: resultName,
	        nextLoc: nextLoc
	      };

	      if (this.method === "next") {
	        // Deliberately forget the last sent value so that we don't
	        // accidentally pass it on to the delegate.
	        this.arg = undefined$1;
	      }

	      return ContinueSentinel;
	    }
	  };

	  // Regardless of whether this script is executing as a CommonJS module
	  // or not, return the runtime object so that we can declare the variable
	  // regeneratorRuntime in the outer scope, which allows this module to be
	  // injected easily by `bin/regenerator --include-runtime script.js`.
	  return exports;

	}(
	  // If this script is executing as a CommonJS module, use module.exports
	  // as the regeneratorRuntime namespace. Otherwise create a new empty
	  // object. Either way, the resulting object will be used to initialize
	  // the regeneratorRuntime variable at the top of this file.
	   module.exports 
	));

	try {
	  regeneratorRuntime = runtime;
	} catch (accidentalStrictMode) {
	  // This module should not be running in strict mode, so the above
	  // assignment should always work unless something is misconfigured. Just
	  // in case runtime.js accidentally runs in strict mode, we can escape
	  // strict mode using a global Function call. This could conceivably fail
	  // if a Content Security Policy forbids using Function, but in that case
	  // the proper solution is to fix the accidental strict mode problem. If
	  // you've misconfigured your bundler to force strict mode and applied a
	  // CSP to forbid Function, and you're not willing to fix either of those
	  // problems, please detail your unique predicament in a GitHub issue.
	  Function("r", "regeneratorRuntime = r")(runtime);
	}
	});

	function _typeof(obj) {
	  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
	    _typeof = function (obj) {
	      return typeof obj;
	    };
	  } else {
	    _typeof = function (obj) {
	      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	    };
	  }

	  return _typeof(obj);
	}

	function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
	  try {
	    var info = gen[key](arg);
	    var value = info.value;
	  } catch (error) {
	    reject(error);
	    return;
	  }

	  if (info.done) {
	    resolve(value);
	  } else {
	    Promise.resolve(value).then(_next, _throw);
	  }
	}

	function _asyncToGenerator(fn) {
	  return function () {
	    var self = this,
	        args = arguments;
	    return new Promise(function (resolve, reject) {
	      var gen = fn.apply(self, args);

	      function _next(value) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
	      }

	      function _throw(err) {
	        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
	      }

	      _next(undefined);
	    });
	  };
	}

	function _classCallCheck(instance, Constructor) {
	  if (!(instance instanceof Constructor)) {
	    throw new TypeError("Cannot call a class as a function");
	  }
	}

	function _defineProperties(target, props) {
	  for (var i = 0; i < props.length; i++) {
	    var descriptor = props[i];
	    descriptor.enumerable = descriptor.enumerable || false;
	    descriptor.configurable = true;
	    if ("value" in descriptor) descriptor.writable = true;
	    Object.defineProperty(target, descriptor.key, descriptor);
	  }
	}

	function _createClass(Constructor, protoProps, staticProps) {
	  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
	  if (staticProps) _defineProperties(Constructor, staticProps);
	  return Constructor;
	}

	function _inherits(subClass, superClass) {
	  if (typeof superClass !== "function" && superClass !== null) {
	    throw new TypeError("Super expression must either be null or a function");
	  }

	  subClass.prototype = Object.create(superClass && superClass.prototype, {
	    constructor: {
	      value: subClass,
	      writable: true,
	      configurable: true
	    }
	  });
	  if (superClass) _setPrototypeOf(subClass, superClass);
	}

	function _getPrototypeOf(o) {
	  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
	    return o.__proto__ || Object.getPrototypeOf(o);
	  };
	  return _getPrototypeOf(o);
	}

	function _setPrototypeOf(o, p) {
	  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
	    o.__proto__ = p;
	    return o;
	  };

	  return _setPrototypeOf(o, p);
	}

	function _assertThisInitialized(self) {
	  if (self === void 0) {
	    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
	  }

	  return self;
	}

	function _possibleConstructorReturn(self, call) {
	  if (call && (typeof call === "object" || typeof call === "function")) {
	    return call;
	  }

	  return _assertThisInitialized(self);
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}

	function _iterableToArrayLimit(arr, i) {
	  if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
	    return;
	  }

	  var _arr = [];
	  var _n = true;
	  var _d = false;
	  var _e = undefined;

	  try {
	    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance");
	}

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	var objectKeys = Object.keys || function keys(O) {
	  return objectKeysInternal(O, enumBugKeys);
	};

	// `Object.defineProperties` method
	// https://tc39.github.io/ecma262/#sec-object.defineproperties
	var objectDefineProperties = descriptors ? Object.defineProperties : function defineProperties(O, Properties) {
	  anObject(O);
	  var keys = objectKeys(Properties);
	  var length = keys.length;
	  var index = 0;
	  var key;
	  while (length > index) objectDefineProperty.f(O, key = keys[index++], Properties[key]);
	  return O;
	};

	var html = getBuiltIn('document', 'documentElement');

	var GT = '>';
	var LT = '<';
	var PROTOTYPE = 'prototype';
	var SCRIPT = 'script';
	var IE_PROTO = sharedKey('IE_PROTO');

	var EmptyConstructor = function () { /* empty */ };

	var scriptTag = function (content) {
	  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
	};

	// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
	var NullProtoObjectViaActiveX = function (activeXDocument) {
	  activeXDocument.write(scriptTag(''));
	  activeXDocument.close();
	  var temp = activeXDocument.parentWindow.Object;
	  activeXDocument = null; // avoid memory leak
	  return temp;
	};

	// Create object with fake `null` prototype: use iframe Object with cleared prototype
	var NullProtoObjectViaIFrame = function () {
	  // Thrash, waste and sodomy: IE GC bug
	  var iframe = documentCreateElement('iframe');
	  var JS = 'java' + SCRIPT + ':';
	  var iframeDocument;
	  iframe.style.display = 'none';
	  html.appendChild(iframe);
	  // https://github.com/zloirock/core-js/issues/475
	  iframe.src = String(JS);
	  iframeDocument = iframe.contentWindow.document;
	  iframeDocument.open();
	  iframeDocument.write(scriptTag('document.F=Object'));
	  iframeDocument.close();
	  return iframeDocument.F;
	};

	// Check for document.domain and active x support
	// No need to use active x approach when document.domain is not set
	// see https://github.com/es-shims/es5-shim/issues/150
	// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
	// avoid IE GC bug
	var activeXDocument;
	var NullProtoObject = function () {
	  try {
	    /* global ActiveXObject */
	    activeXDocument = document.domain && new ActiveXObject('htmlfile');
	  } catch (error) { /* ignore */ }
	  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
	  var length = enumBugKeys.length;
	  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
	  return NullProtoObject();
	};

	hiddenKeys[IE_PROTO] = true;

	// `Object.create` method
	// https://tc39.github.io/ecma262/#sec-object.create
	var objectCreate = Object.create || function create(O, Properties) {
	  var result;
	  if (O !== null) {
	    EmptyConstructor[PROTOTYPE] = anObject(O);
	    result = new EmptyConstructor();
	    EmptyConstructor[PROTOTYPE] = null;
	    // add "__proto__" for Object.getPrototypeOf polyfill
	    result[IE_PROTO] = O;
	  } else result = NullProtoObject();
	  return Properties === undefined ? result : objectDefineProperties(result, Properties);
	};

	var UNSCOPABLES = wellKnownSymbol('unscopables');
	var ArrayPrototype = Array.prototype;

	// Array.prototype[@@unscopables]
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	if (ArrayPrototype[UNSCOPABLES] == undefined) {
	  objectDefineProperty.f(ArrayPrototype, UNSCOPABLES, {
	    configurable: true,
	    value: objectCreate(null)
	  });
	}

	// add a key to Array.prototype[@@unscopables]
	var addToUnscopables = function (key) {
	  ArrayPrototype[UNSCOPABLES][key] = true;
	};

	var iterators = {};

	var correctPrototypeGetter = !fails(function () {
	  function F() { /* empty */ }
	  F.prototype.constructor = null;
	  return Object.getPrototypeOf(new F()) !== F.prototype;
	});

	var IE_PROTO$1 = sharedKey('IE_PROTO');
	var ObjectPrototype = Object.prototype;

	// `Object.getPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.getprototypeof
	var objectGetPrototypeOf = correctPrototypeGetter ? Object.getPrototypeOf : function (O) {
	  O = toObject(O);
	  if (has(O, IE_PROTO$1)) return O[IE_PROTO$1];
	  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
	    return O.constructor.prototype;
	  } return O instanceof Object ? ObjectPrototype : null;
	};

	var ITERATOR = wellKnownSymbol('iterator');
	var BUGGY_SAFARI_ITERATORS = false;

	var returnThis = function () { return this; };

	// `%IteratorPrototype%` object
	// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
	var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

	if ([].keys) {
	  arrayIterator = [].keys();
	  // Safari 8 has buggy iterators w/o `next`
	  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
	  else {
	    PrototypeOfArrayIteratorPrototype = objectGetPrototypeOf(objectGetPrototypeOf(arrayIterator));
	    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
	  }
	}

	if (IteratorPrototype == undefined) IteratorPrototype = {};

	// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
	if ( !has(IteratorPrototype, ITERATOR)) {
	  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
	}

	var iteratorsCore = {
	  IteratorPrototype: IteratorPrototype,
	  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
	};

	var defineProperty = objectDefineProperty.f;



	var TO_STRING_TAG = wellKnownSymbol('toStringTag');

	var setToStringTag = function (it, TAG, STATIC) {
	  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
	    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
	  }
	};

	var IteratorPrototype$1 = iteratorsCore.IteratorPrototype;





	var returnThis$1 = function () { return this; };

	var createIteratorConstructor = function (IteratorConstructor, NAME, next) {
	  var TO_STRING_TAG = NAME + ' Iterator';
	  IteratorConstructor.prototype = objectCreate(IteratorPrototype$1, { next: createPropertyDescriptor(1, next) });
	  setToStringTag(IteratorConstructor, TO_STRING_TAG, false);
	  iterators[TO_STRING_TAG] = returnThis$1;
	  return IteratorConstructor;
	};

	var aPossiblePrototype = function (it) {
	  if (!isObject(it) && it !== null) {
	    throw TypeError("Can't set " + String(it) + ' as a prototype');
	  } return it;
	};

	// `Object.setPrototypeOf` method
	// https://tc39.github.io/ecma262/#sec-object.setprototypeof
	// Works with __proto__ only. Old v8 can't work with null proto objects.
	/* eslint-disable no-proto */
	var objectSetPrototypeOf = Object.setPrototypeOf || ('__proto__' in {} ? function () {
	  var CORRECT_SETTER = false;
	  var test = {};
	  var setter;
	  try {
	    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
	    setter.call(test, []);
	    CORRECT_SETTER = test instanceof Array;
	  } catch (error) { /* empty */ }
	  return function setPrototypeOf(O, proto) {
	    anObject(O);
	    aPossiblePrototype(proto);
	    if (CORRECT_SETTER) setter.call(O, proto);
	    else O.__proto__ = proto;
	    return O;
	  };
	}() : undefined);

	var IteratorPrototype$2 = iteratorsCore.IteratorPrototype;
	var BUGGY_SAFARI_ITERATORS$1 = iteratorsCore.BUGGY_SAFARI_ITERATORS;
	var ITERATOR$1 = wellKnownSymbol('iterator');
	var KEYS = 'keys';
	var VALUES = 'values';
	var ENTRIES = 'entries';

	var returnThis$2 = function () { return this; };

	var defineIterator = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
	  createIteratorConstructor(IteratorConstructor, NAME, next);

	  var getIterationMethod = function (KIND) {
	    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
	    if (!BUGGY_SAFARI_ITERATORS$1 && KIND in IterablePrototype) return IterablePrototype[KIND];
	    switch (KIND) {
	      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
	      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
	      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
	    } return function () { return new IteratorConstructor(this); };
	  };

	  var TO_STRING_TAG = NAME + ' Iterator';
	  var INCORRECT_VALUES_NAME = false;
	  var IterablePrototype = Iterable.prototype;
	  var nativeIterator = IterablePrototype[ITERATOR$1]
	    || IterablePrototype['@@iterator']
	    || DEFAULT && IterablePrototype[DEFAULT];
	  var defaultIterator = !BUGGY_SAFARI_ITERATORS$1 && nativeIterator || getIterationMethod(DEFAULT);
	  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
	  var CurrentIteratorPrototype, methods, KEY;

	  // fix native
	  if (anyNativeIterator) {
	    CurrentIteratorPrototype = objectGetPrototypeOf(anyNativeIterator.call(new Iterable()));
	    if (IteratorPrototype$2 !== Object.prototype && CurrentIteratorPrototype.next) {
	      if ( objectGetPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype$2) {
	        if (objectSetPrototypeOf) {
	          objectSetPrototypeOf(CurrentIteratorPrototype, IteratorPrototype$2);
	        } else if (typeof CurrentIteratorPrototype[ITERATOR$1] != 'function') {
	          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR$1, returnThis$2);
	        }
	      }
	      // Set @@toStringTag to native iterators
	      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true);
	    }
	  }

	  // fix Array#{values, @@iterator}.name in V8 / FF
	  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
	    INCORRECT_VALUES_NAME = true;
	    defaultIterator = function values() { return nativeIterator.call(this); };
	  }

	  // define iterator
	  if ( IterablePrototype[ITERATOR$1] !== defaultIterator) {
	    createNonEnumerableProperty(IterablePrototype, ITERATOR$1, defaultIterator);
	  }
	  iterators[NAME] = defaultIterator;

	  // export additional methods
	  if (DEFAULT) {
	    methods = {
	      values: getIterationMethod(VALUES),
	      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
	      entries: getIterationMethod(ENTRIES)
	    };
	    if (FORCED) for (KEY in methods) {
	      if (BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
	        redefine(IterablePrototype, KEY, methods[KEY]);
	      }
	    } else _export({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS$1 || INCORRECT_VALUES_NAME }, methods);
	  }

	  return methods;
	};

	var ARRAY_ITERATOR = 'Array Iterator';
	var setInternalState = internalState.set;
	var getInternalState = internalState.getterFor(ARRAY_ITERATOR);

	// `Array.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.entries
	// `Array.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.keys
	// `Array.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.values
	// `Array.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
	// `CreateArrayIterator` internal method
	// https://tc39.github.io/ecma262/#sec-createarrayiterator
	var es_array_iterator = defineIterator(Array, 'Array', function (iterated, kind) {
	  setInternalState(this, {
	    type: ARRAY_ITERATOR,
	    target: toIndexedObject(iterated), // target
	    index: 0,                          // next index
	    kind: kind                         // kind
	  });
	// `%ArrayIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
	}, function () {
	  var state = getInternalState(this);
	  var target = state.target;
	  var kind = state.kind;
	  var index = state.index++;
	  if (!target || index >= target.length) {
	    state.target = undefined;
	    return { value: undefined, done: true };
	  }
	  if (kind == 'keys') return { value: index, done: false };
	  if (kind == 'values') return { value: target[index], done: false };
	  return { value: [index, target[index]], done: false };
	}, 'values');

	// argumentsList[@@iterator] is %ArrayProto_values%
	// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
	// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
	iterators.Arguments = iterators.Array;

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('keys');
	addToUnscopables('values');
	addToUnscopables('entries');

	var freezing = !fails(function () {
	  return Object.isExtensible(Object.preventExtensions({}));
	});

	var internalMetadata = createCommonjsModule(function (module) {
	var defineProperty = objectDefineProperty.f;



	var METADATA = uid('meta');
	var id = 0;

	var isExtensible = Object.isExtensible || function () {
	  return true;
	};

	var setMetadata = function (it) {
	  defineProperty(it, METADATA, { value: {
	    objectID: 'O' + ++id, // object ID
	    weakData: {}          // weak collections IDs
	  } });
	};

	var fastKey = function (it, create) {
	  // return a primitive with prefix
	  if (!isObject(it)) return typeof it == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return 'F';
	    // not necessary to add metadata
	    if (!create) return 'E';
	    // add missing metadata
	    setMetadata(it);
	  // return object ID
	  } return it[METADATA].objectID;
	};

	var getWeakData = function (it, create) {
	  if (!has(it, METADATA)) {
	    // can't set metadata to uncaught frozen object
	    if (!isExtensible(it)) return true;
	    // not necessary to add metadata
	    if (!create) return false;
	    // add missing metadata
	    setMetadata(it);
	  // return the store of weak collections IDs
	  } return it[METADATA].weakData;
	};

	// add metadata on freeze-family methods calling
	var onFreeze = function (it) {
	  if (freezing && meta.REQUIRED && isExtensible(it) && !has(it, METADATA)) setMetadata(it);
	  return it;
	};

	var meta = module.exports = {
	  REQUIRED: false,
	  fastKey: fastKey,
	  getWeakData: getWeakData,
	  onFreeze: onFreeze
	};

	hiddenKeys[METADATA] = true;
	});
	var internalMetadata_1 = internalMetadata.REQUIRED;
	var internalMetadata_2 = internalMetadata.fastKey;
	var internalMetadata_3 = internalMetadata.getWeakData;
	var internalMetadata_4 = internalMetadata.onFreeze;

	var ITERATOR$2 = wellKnownSymbol('iterator');
	var ArrayPrototype$1 = Array.prototype;

	// check on default Array iterator
	var isArrayIteratorMethod = function (it) {
	  return it !== undefined && (iterators.Array === it || ArrayPrototype$1[ITERATOR$2] === it);
	};

	var aFunction$1 = function (it) {
	  if (typeof it != 'function') {
	    throw TypeError(String(it) + ' is not a function');
	  } return it;
	};

	// optional / simple context binding
	var bindContext = function (fn, that, length) {
	  aFunction$1(fn);
	  if (that === undefined) return fn;
	  switch (length) {
	    case 0: return function () {
	      return fn.call(that);
	    };
	    case 1: return function (a) {
	      return fn.call(that, a);
	    };
	    case 2: return function (a, b) {
	      return fn.call(that, a, b);
	    };
	    case 3: return function (a, b, c) {
	      return fn.call(that, a, b, c);
	    };
	  }
	  return function (/* ...args */) {
	    return fn.apply(that, arguments);
	  };
	};

	var TO_STRING_TAG$1 = wellKnownSymbol('toStringTag');
	var test = {};

	test[TO_STRING_TAG$1] = 'z';

	var toStringTagSupport = String(test) === '[object z]';

	var TO_STRING_TAG$2 = wellKnownSymbol('toStringTag');
	// ES3 wrong here
	var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

	// fallback for IE11 Script Access Denied error
	var tryGet = function (it, key) {
	  try {
	    return it[key];
	  } catch (error) { /* empty */ }
	};

	// getting tag from ES6+ `Object.prototype.toString`
	var classof = toStringTagSupport ? classofRaw : function (it) {
	  var O, tag, result;
	  return it === undefined ? 'Undefined' : it === null ? 'Null'
	    // @@toStringTag case
	    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG$2)) == 'string' ? tag
	    // builtinTag case
	    : CORRECT_ARGUMENTS ? classofRaw(O)
	    // ES3 arguments fallback
	    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
	};

	var ITERATOR$3 = wellKnownSymbol('iterator');

	var getIteratorMethod = function (it) {
	  if (it != undefined) return it[ITERATOR$3]
	    || it['@@iterator']
	    || iterators[classof(it)];
	};

	// call something on iterator step with safe closing on error
	var callWithSafeIterationClosing = function (iterator, fn, value, ENTRIES) {
	  try {
	    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
	  // 7.4.6 IteratorClose(iterator, completion)
	  } catch (error) {
	    var returnMethod = iterator['return'];
	    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
	    throw error;
	  }
	};

	var iterate_1 = createCommonjsModule(function (module) {
	var Result = function (stopped, result) {
	  this.stopped = stopped;
	  this.result = result;
	};

	var iterate = module.exports = function (iterable, fn, that, AS_ENTRIES, IS_ITERATOR) {
	  var boundFunction = bindContext(fn, that, AS_ENTRIES ? 2 : 1);
	  var iterator, iterFn, index, length, result, next, step;

	  if (IS_ITERATOR) {
	    iterator = iterable;
	  } else {
	    iterFn = getIteratorMethod(iterable);
	    if (typeof iterFn != 'function') throw TypeError('Target is not iterable');
	    // optimisation for array iterators
	    if (isArrayIteratorMethod(iterFn)) {
	      for (index = 0, length = toLength(iterable.length); length > index; index++) {
	        result = AS_ENTRIES
	          ? boundFunction(anObject(step = iterable[index])[0], step[1])
	          : boundFunction(iterable[index]);
	        if (result && result instanceof Result) return result;
	      } return new Result(false);
	    }
	    iterator = iterFn.call(iterable);
	  }

	  next = iterator.next;
	  while (!(step = next.call(iterator)).done) {
	    result = callWithSafeIterationClosing(iterator, boundFunction, step.value, AS_ENTRIES);
	    if (typeof result == 'object' && result && result instanceof Result) return result;
	  } return new Result(false);
	};

	iterate.stop = function (result) {
	  return new Result(true, result);
	};
	});

	var anInstance = function (it, Constructor, name) {
	  if (!(it instanceof Constructor)) {
	    throw TypeError('Incorrect ' + (name ? name + ' ' : '') + 'invocation');
	  } return it;
	};

	var ITERATOR$4 = wellKnownSymbol('iterator');
	var SAFE_CLOSING = false;

	try {
	  var called = 0;
	  var iteratorWithReturn = {
	    next: function () {
	      return { done: !!called++ };
	    },
	    'return': function () {
	      SAFE_CLOSING = true;
	    }
	  };
	  iteratorWithReturn[ITERATOR$4] = function () {
	    return this;
	  };
	  // eslint-disable-next-line no-throw-literal
	  Array.from(iteratorWithReturn, function () { throw 2; });
	} catch (error) { /* empty */ }

	var checkCorrectnessOfIteration = function (exec, SKIP_CLOSING) {
	  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
	  var ITERATION_SUPPORT = false;
	  try {
	    var object = {};
	    object[ITERATOR$4] = function () {
	      return {
	        next: function () {
	          return { done: ITERATION_SUPPORT = true };
	        }
	      };
	    };
	    exec(object);
	  } catch (error) { /* empty */ }
	  return ITERATION_SUPPORT;
	};

	// makes subclassing work correct for wrapped built-ins
	var inheritIfRequired = function ($this, dummy, Wrapper) {
	  var NewTarget, NewTargetPrototype;
	  if (
	    // it can work only with native `setPrototypeOf`
	    objectSetPrototypeOf &&
	    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
	    typeof (NewTarget = dummy.constructor) == 'function' &&
	    NewTarget !== Wrapper &&
	    isObject(NewTargetPrototype = NewTarget.prototype) &&
	    NewTargetPrototype !== Wrapper.prototype
	  ) objectSetPrototypeOf($this, NewTargetPrototype);
	  return $this;
	};

	var collection = function (CONSTRUCTOR_NAME, wrapper, common) {
	  var IS_MAP = CONSTRUCTOR_NAME.indexOf('Map') !== -1;
	  var IS_WEAK = CONSTRUCTOR_NAME.indexOf('Weak') !== -1;
	  var ADDER = IS_MAP ? 'set' : 'add';
	  var NativeConstructor = global_1[CONSTRUCTOR_NAME];
	  var NativePrototype = NativeConstructor && NativeConstructor.prototype;
	  var Constructor = NativeConstructor;
	  var exported = {};

	  var fixMethod = function (KEY) {
	    var nativeMethod = NativePrototype[KEY];
	    redefine(NativePrototype, KEY,
	      KEY == 'add' ? function add(value) {
	        nativeMethod.call(this, value === 0 ? 0 : value);
	        return this;
	      } : KEY == 'delete' ? function (key) {
	        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : KEY == 'get' ? function get(key) {
	        return IS_WEAK && !isObject(key) ? undefined : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : KEY == 'has' ? function has(key) {
	        return IS_WEAK && !isObject(key) ? false : nativeMethod.call(this, key === 0 ? 0 : key);
	      } : function set(key, value) {
	        nativeMethod.call(this, key === 0 ? 0 : key, value);
	        return this;
	      }
	    );
	  };

	  // eslint-disable-next-line max-len
	  if (isForced_1(CONSTRUCTOR_NAME, typeof NativeConstructor != 'function' || !(IS_WEAK || NativePrototype.forEach && !fails(function () {
	    new NativeConstructor().entries().next();
	  })))) {
	    // create collection constructor
	    Constructor = common.getConstructor(wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER);
	    internalMetadata.REQUIRED = true;
	  } else if (isForced_1(CONSTRUCTOR_NAME, true)) {
	    var instance = new Constructor();
	    // early implementations not supports chaining
	    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
	    // V8 ~ Chromium 40- weak-collections throws on primitives, but should return false
	    var THROWS_ON_PRIMITIVES = fails(function () { instance.has(1); });
	    // most early implementations doesn't supports iterables, most modern - not close it correctly
	    // eslint-disable-next-line no-new
	    var ACCEPT_ITERABLES = checkCorrectnessOfIteration(function (iterable) { new NativeConstructor(iterable); });
	    // for early implementations -0 and +0 not the same
	    var BUGGY_ZERO = !IS_WEAK && fails(function () {
	      // V8 ~ Chromium 42- fails only with 5+ elements
	      var $instance = new NativeConstructor();
	      var index = 5;
	      while (index--) $instance[ADDER](index, index);
	      return !$instance.has(-0);
	    });

	    if (!ACCEPT_ITERABLES) {
	      Constructor = wrapper(function (dummy, iterable) {
	        anInstance(dummy, Constructor, CONSTRUCTOR_NAME);
	        var that = inheritIfRequired(new NativeConstructor(), dummy, Constructor);
	        if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	        return that;
	      });
	      Constructor.prototype = NativePrototype;
	      NativePrototype.constructor = Constructor;
	    }

	    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
	      fixMethod('delete');
	      fixMethod('has');
	      IS_MAP && fixMethod('get');
	    }

	    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);

	    // weak collections should not contains .clear method
	    if (IS_WEAK && NativePrototype.clear) delete NativePrototype.clear;
	  }

	  exported[CONSTRUCTOR_NAME] = Constructor;
	  _export({ global: true, forced: Constructor != NativeConstructor }, exported);

	  setToStringTag(Constructor, CONSTRUCTOR_NAME);

	  if (!IS_WEAK) common.setStrong(Constructor, CONSTRUCTOR_NAME, IS_MAP);

	  return Constructor;
	};

	var redefineAll = function (target, src, options) {
	  for (var key in src) redefine(target, key, src[key], options);
	  return target;
	};

	var SPECIES$2 = wellKnownSymbol('species');

	var setSpecies = function (CONSTRUCTOR_NAME) {
	  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
	  var defineProperty = objectDefineProperty.f;

	  if (descriptors && Constructor && !Constructor[SPECIES$2]) {
	    defineProperty(Constructor, SPECIES$2, {
	      configurable: true,
	      get: function () { return this; }
	    });
	  }
	};

	var defineProperty$1 = objectDefineProperty.f;








	var fastKey = internalMetadata.fastKey;


	var setInternalState$1 = internalState.set;
	var internalStateGetterFor = internalState.getterFor;

	var collectionStrong = {
	  getConstructor: function (wrapper, CONSTRUCTOR_NAME, IS_MAP, ADDER) {
	    var C = wrapper(function (that, iterable) {
	      anInstance(that, C, CONSTRUCTOR_NAME);
	      setInternalState$1(that, {
	        type: CONSTRUCTOR_NAME,
	        index: objectCreate(null),
	        first: undefined,
	        last: undefined,
	        size: 0
	      });
	      if (!descriptors) that.size = 0;
	      if (iterable != undefined) iterate_1(iterable, that[ADDER], that, IS_MAP);
	    });

	    var getInternalState = internalStateGetterFor(CONSTRUCTOR_NAME);

	    var define = function (that, key, value) {
	      var state = getInternalState(that);
	      var entry = getEntry(that, key);
	      var previous, index;
	      // change existing entry
	      if (entry) {
	        entry.value = value;
	      // create new entry
	      } else {
	        state.last = entry = {
	          index: index = fastKey(key, true),
	          key: key,
	          value: value,
	          previous: previous = state.last,
	          next: undefined,
	          removed: false
	        };
	        if (!state.first) state.first = entry;
	        if (previous) previous.next = entry;
	        if (descriptors) state.size++;
	        else that.size++;
	        // add to index
	        if (index !== 'F') state.index[index] = entry;
	      } return that;
	    };

	    var getEntry = function (that, key) {
	      var state = getInternalState(that);
	      // fast case
	      var index = fastKey(key);
	      var entry;
	      if (index !== 'F') return state.index[index];
	      // frozen object case
	      for (entry = state.first; entry; entry = entry.next) {
	        if (entry.key == key) return entry;
	      }
	    };

	    redefineAll(C.prototype, {
	      // 23.1.3.1 Map.prototype.clear()
	      // 23.2.3.2 Set.prototype.clear()
	      clear: function clear() {
	        var that = this;
	        var state = getInternalState(that);
	        var data = state.index;
	        var entry = state.first;
	        while (entry) {
	          entry.removed = true;
	          if (entry.previous) entry.previous = entry.previous.next = undefined;
	          delete data[entry.index];
	          entry = entry.next;
	        }
	        state.first = state.last = undefined;
	        if (descriptors) state.size = 0;
	        else that.size = 0;
	      },
	      // 23.1.3.3 Map.prototype.delete(key)
	      // 23.2.3.4 Set.prototype.delete(value)
	      'delete': function (key) {
	        var that = this;
	        var state = getInternalState(that);
	        var entry = getEntry(that, key);
	        if (entry) {
	          var next = entry.next;
	          var prev = entry.previous;
	          delete state.index[entry.index];
	          entry.removed = true;
	          if (prev) prev.next = next;
	          if (next) next.previous = prev;
	          if (state.first == entry) state.first = next;
	          if (state.last == entry) state.last = prev;
	          if (descriptors) state.size--;
	          else that.size--;
	        } return !!entry;
	      },
	      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
	      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
	      forEach: function forEach(callbackfn /* , that = undefined */) {
	        var state = getInternalState(this);
	        var boundFunction = bindContext(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
	        var entry;
	        while (entry = entry ? entry.next : state.first) {
	          boundFunction(entry.value, entry.key, this);
	          // revert to the last existing entry
	          while (entry && entry.removed) entry = entry.previous;
	        }
	      },
	      // 23.1.3.7 Map.prototype.has(key)
	      // 23.2.3.7 Set.prototype.has(value)
	      has: function has(key) {
	        return !!getEntry(this, key);
	      }
	    });

	    redefineAll(C.prototype, IS_MAP ? {
	      // 23.1.3.6 Map.prototype.get(key)
	      get: function get(key) {
	        var entry = getEntry(this, key);
	        return entry && entry.value;
	      },
	      // 23.1.3.9 Map.prototype.set(key, value)
	      set: function set(key, value) {
	        return define(this, key === 0 ? 0 : key, value);
	      }
	    } : {
	      // 23.2.3.1 Set.prototype.add(value)
	      add: function add(value) {
	        return define(this, value = value === 0 ? 0 : value, value);
	      }
	    });
	    if (descriptors) defineProperty$1(C.prototype, 'size', {
	      get: function () {
	        return getInternalState(this).size;
	      }
	    });
	    return C;
	  },
	  setStrong: function (C, CONSTRUCTOR_NAME, IS_MAP) {
	    var ITERATOR_NAME = CONSTRUCTOR_NAME + ' Iterator';
	    var getInternalCollectionState = internalStateGetterFor(CONSTRUCTOR_NAME);
	    var getInternalIteratorState = internalStateGetterFor(ITERATOR_NAME);
	    // add .keys, .values, .entries, [@@iterator]
	    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
	    defineIterator(C, CONSTRUCTOR_NAME, function (iterated, kind) {
	      setInternalState$1(this, {
	        type: ITERATOR_NAME,
	        target: iterated,
	        state: getInternalCollectionState(iterated),
	        kind: kind,
	        last: undefined
	      });
	    }, function () {
	      var state = getInternalIteratorState(this);
	      var kind = state.kind;
	      var entry = state.last;
	      // revert to the last existing entry
	      while (entry && entry.removed) entry = entry.previous;
	      // get next entry
	      if (!state.target || !(state.last = entry = entry ? entry.next : state.state.first)) {
	        // or finish the iteration
	        state.target = undefined;
	        return { value: undefined, done: true };
	      }
	      // return step by kind
	      if (kind == 'keys') return { value: entry.key, done: false };
	      if (kind == 'values') return { value: entry.value, done: false };
	      return { value: [entry.key, entry.value], done: false };
	    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

	    // add [@@species], 23.1.2.2, 23.2.2.2
	    setSpecies(CONSTRUCTOR_NAME);
	  }
	};

	// `Map` constructor
	// https://tc39.github.io/ecma262/#sec-map-objects
	var es_map = collection('Map', function (init) {
	  return function Map() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	// `Object.prototype.toString` method implementation
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	var objectToString = toStringTagSupport ? {}.toString : function toString() {
	  return '[object ' + classof(this) + ']';
	};

	// `Object.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
	if (!toStringTagSupport) {
	  redefine(Object.prototype, 'toString', objectToString, { unsafe: true });
	}

	// `RegExp.prototype.flags` getter implementation
	// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
	var regexpFlags = function () {
	  var that = anObject(this);
	  var result = '';
	  if (that.global) result += 'g';
	  if (that.ignoreCase) result += 'i';
	  if (that.multiline) result += 'm';
	  if (that.dotAll) result += 's';
	  if (that.unicode) result += 'u';
	  if (that.sticky) result += 'y';
	  return result;
	};

	// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
	// so we use an intermediate function.
	function RE(s, f) {
	  return RegExp(s, f);
	}

	var UNSUPPORTED_Y = fails(function () {
	  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
	  var re = RE('a', 'y');
	  re.lastIndex = 2;
	  return re.exec('abcd') != null;
	});

	var BROKEN_CARET = fails(function () {
	  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
	  var re = RE('^r', 'gy');
	  re.lastIndex = 2;
	  return re.exec('str') != null;
	});

	var regexpStickyHelpers = {
		UNSUPPORTED_Y: UNSUPPORTED_Y,
		BROKEN_CARET: BROKEN_CARET
	};

	var nativeExec = RegExp.prototype.exec;
	// This always refers to the native implementation, because the
	// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
	// which loads this file before patching the method.
	var nativeReplace = String.prototype.replace;

	var patchedExec = nativeExec;

	var UPDATES_LAST_INDEX_WRONG = (function () {
	  var re1 = /a/;
	  var re2 = /b*/g;
	  nativeExec.call(re1, 'a');
	  nativeExec.call(re2, 'a');
	  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
	})();

	var UNSUPPORTED_Y$1 = regexpStickyHelpers.UNSUPPORTED_Y || regexpStickyHelpers.BROKEN_CARET;

	// nonparticipating capturing group, copied from es5-shim's String#split patch.
	var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

	var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y$1;

	if (PATCH) {
	  patchedExec = function exec(str) {
	    var re = this;
	    var lastIndex, reCopy, match, i;
	    var sticky = UNSUPPORTED_Y$1 && re.sticky;
	    var flags = regexpFlags.call(re);
	    var source = re.source;
	    var charsAdded = 0;
	    var strCopy = str;

	    if (sticky) {
	      flags = flags.replace('y', '');
	      if (flags.indexOf('g') === -1) {
	        flags += 'g';
	      }

	      strCopy = String(str).slice(re.lastIndex);
	      // Support anchored sticky behavior.
	      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
	        source = '(?: ' + source + ')';
	        strCopy = ' ' + strCopy;
	        charsAdded++;
	      }
	      // ^(? + rx + ) is needed, in combination with some str slicing, to
	      // simulate the 'y' flag.
	      reCopy = new RegExp('^(?:' + source + ')', flags);
	    }

	    if (NPCG_INCLUDED) {
	      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
	    }
	    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

	    match = nativeExec.call(sticky ? reCopy : re, strCopy);

	    if (sticky) {
	      if (match) {
	        match.input = match.input.slice(charsAdded);
	        match[0] = match[0].slice(charsAdded);
	        match.index = re.lastIndex;
	        re.lastIndex += match[0].length;
	      } else re.lastIndex = 0;
	    } else if (UPDATES_LAST_INDEX_WRONG && match) {
	      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
	    }
	    if (NPCG_INCLUDED && match && match.length > 1) {
	      // Fix browsers whose `exec` methods don't consistently return `undefined`
	      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
	      nativeReplace.call(match[0], reCopy, function () {
	        for (i = 1; i < arguments.length - 2; i++) {
	          if (arguments[i] === undefined) match[i] = undefined;
	        }
	      });
	    }

	    return match;
	  };
	}

	var regexpExec = patchedExec;

	_export({ target: 'RegExp', proto: true, forced: /./.exec !== regexpExec }, {
	  exec: regexpExec
	});

	// `String.prototype.{ codePointAt, at }` methods implementation
	var createMethod$1 = function (CONVERT_TO_STRING) {
	  return function ($this, pos) {
	    var S = String(requireObjectCoercible($this));
	    var position = toInteger(pos);
	    var size = S.length;
	    var first, second;
	    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
	    first = S.charCodeAt(position);
	    return first < 0xD800 || first > 0xDBFF || position + 1 === size
	      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
	        ? CONVERT_TO_STRING ? S.charAt(position) : first
	        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
	  };
	};

	var stringMultibyte = {
	  // `String.prototype.codePointAt` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
	  codeAt: createMethod$1(false),
	  // `String.prototype.at` method
	  // https://github.com/mathiasbynens/String.prototype.at
	  charAt: createMethod$1(true)
	};

	var charAt = stringMultibyte.charAt;



	var STRING_ITERATOR = 'String Iterator';
	var setInternalState$2 = internalState.set;
	var getInternalState$1 = internalState.getterFor(STRING_ITERATOR);

	// `String.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
	defineIterator(String, 'String', function (iterated) {
	  setInternalState$2(this, {
	    type: STRING_ITERATOR,
	    string: String(iterated),
	    index: 0
	  });
	// `%StringIteratorPrototype%.next` method
	// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
	}, function next() {
	  var state = getInternalState$1(this);
	  var string = state.string;
	  var index = state.index;
	  var point;
	  if (index >= string.length) return { value: undefined, done: true };
	  point = charAt(string, index);
	  state.index += point.length;
	  return { value: point, done: false };
	});

	var SPECIES$3 = wellKnownSymbol('species');

	var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
	  // #replace needs built-in support for named groups.
	  // #match works fine because it just return the exec results, even if it has
	  // a "grops" property.
	  var re = /./;
	  re.exec = function () {
	    var result = [];
	    result.groups = { a: '7' };
	    return result;
	  };
	  return ''.replace(re, '$<a>') !== '7';
	});

	// IE <= 11 replaces $0 with the whole match, as if it was $&
	// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
	var REPLACE_KEEPS_$0 = (function () {
	  return 'a'.replace(/./, '$0') === '$0';
	})();

	// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
	// Weex JS has frozen built-in prototypes, so use try / catch wrapper
	var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
	  var re = /(?:)/;
	  var originalExec = re.exec;
	  re.exec = function () { return originalExec.apply(this, arguments); };
	  var result = 'ab'.split(re);
	  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
	});

	var fixRegexpWellKnownSymbolLogic = function (KEY, length, exec, sham) {
	  var SYMBOL = wellKnownSymbol(KEY);

	  var DELEGATES_TO_SYMBOL = !fails(function () {
	    // String methods call symbol-named RegEp methods
	    var O = {};
	    O[SYMBOL] = function () { return 7; };
	    return ''[KEY](O) != 7;
	  });

	  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
	    // Symbol-named RegExp methods call .exec
	    var execCalled = false;
	    var re = /a/;

	    if (KEY === 'split') {
	      // We can't use real regex here since it causes deoptimization
	      // and serious performance degradation in V8
	      // https://github.com/zloirock/core-js/issues/306
	      re = {};
	      // RegExp[@@split] doesn't call the regex's exec method, but first creates
	      // a new one. We need to return the patched regex when creating the new one.
	      re.constructor = {};
	      re.constructor[SPECIES$3] = function () { return re; };
	      re.flags = '';
	      re[SYMBOL] = /./[SYMBOL];
	    }

	    re.exec = function () { execCalled = true; return null; };

	    re[SYMBOL]('');
	    return !execCalled;
	  });

	  if (
	    !DELEGATES_TO_SYMBOL ||
	    !DELEGATES_TO_EXEC ||
	    (KEY === 'replace' && !(REPLACE_SUPPORTS_NAMED_GROUPS && REPLACE_KEEPS_$0)) ||
	    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
	  ) {
	    var nativeRegExpMethod = /./[SYMBOL];
	    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
	      if (regexp.exec === regexpExec) {
	        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
	          // The native String method already delegates to @@method (this
	          // polyfilled function), leasing to infinite recursion.
	          // We avoid it by directly calling the native @@method method.
	          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
	        }
	        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
	      }
	      return { done: false };
	    }, { REPLACE_KEEPS_$0: REPLACE_KEEPS_$0 });
	    var stringMethod = methods[0];
	    var regexMethod = methods[1];

	    redefine(String.prototype, KEY, stringMethod);
	    redefine(RegExp.prototype, SYMBOL, length == 2
	      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
	      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
	      ? function (string, arg) { return regexMethod.call(string, this, arg); }
	      // 21.2.5.6 RegExp.prototype[@@match](string)
	      // 21.2.5.9 RegExp.prototype[@@search](string)
	      : function (string) { return regexMethod.call(string, this); }
	    );
	  }

	  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
	};

	var charAt$1 = stringMultibyte.charAt;

	// `AdvanceStringIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-advancestringindex
	var advanceStringIndex = function (S, index, unicode) {
	  return index + (unicode ? charAt$1(S, index).length : 1);
	};

	// `RegExpExec` abstract operation
	// https://tc39.github.io/ecma262/#sec-regexpexec
	var regexpExecAbstract = function (R, S) {
	  var exec = R.exec;
	  if (typeof exec === 'function') {
	    var result = exec.call(R, S);
	    if (typeof result !== 'object') {
	      throw TypeError('RegExp exec method returned something other than an Object or null');
	    }
	    return result;
	  }

	  if (classofRaw(R) !== 'RegExp') {
	    throw TypeError('RegExp#exec called on incompatible receiver');
	  }

	  return regexpExec.call(R, S);
	};

	// @@match logic
	fixRegexpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
	  return [
	    // `String.prototype.match` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.match
	    function match(regexp) {
	      var O = requireObjectCoercible(this);
	      var matcher = regexp == undefined ? undefined : regexp[MATCH];
	      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
	    },
	    // `RegExp.prototype[@@match]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
	    function (regexp) {
	      var res = maybeCallNative(nativeMatch, regexp, this);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);

	      if (!rx.global) return regexpExecAbstract(rx, S);

	      var fullUnicode = rx.unicode;
	      rx.lastIndex = 0;
	      var A = [];
	      var n = 0;
	      var result;
	      while ((result = regexpExecAbstract(rx, S)) !== null) {
	        var matchStr = String(result[0]);
	        A[n] = matchStr;
	        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
	        n++;
	      }
	      return n === 0 ? null : A;
	    }
	  ];
	});

	// iterable DOM collections
	// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
	var domIterables = {
	  CSSRuleList: 0,
	  CSSStyleDeclaration: 0,
	  CSSValueList: 0,
	  ClientRectList: 0,
	  DOMRectList: 0,
	  DOMStringList: 0,
	  DOMTokenList: 1,
	  DataTransferItemList: 0,
	  FileList: 0,
	  HTMLAllCollection: 0,
	  HTMLCollection: 0,
	  HTMLFormElement: 0,
	  HTMLSelectElement: 0,
	  MediaList: 0,
	  MimeTypeArray: 0,
	  NamedNodeMap: 0,
	  NodeList: 1,
	  PaintRequestList: 0,
	  Plugin: 0,
	  PluginArray: 0,
	  SVGLengthList: 0,
	  SVGNumberList: 0,
	  SVGPathSegList: 0,
	  SVGPointList: 0,
	  SVGStringList: 0,
	  SVGTransformList: 0,
	  SourceBufferList: 0,
	  StyleSheetList: 0,
	  TextTrackCueList: 0,
	  TextTrackList: 0,
	  TouchList: 0
	};

	var ITERATOR$5 = wellKnownSymbol('iterator');
	var TO_STRING_TAG$3 = wellKnownSymbol('toStringTag');
	var ArrayValues = es_array_iterator.values;

	for (var COLLECTION_NAME in domIterables) {
	  var Collection = global_1[COLLECTION_NAME];
	  var CollectionPrototype = Collection && Collection.prototype;
	  if (CollectionPrototype) {
	    // some Chrome versions have non-configurable methods on DOMTokenList
	    if (CollectionPrototype[ITERATOR$5] !== ArrayValues) try {
	      createNonEnumerableProperty(CollectionPrototype, ITERATOR$5, ArrayValues);
	    } catch (error) {
	      CollectionPrototype[ITERATOR$5] = ArrayValues;
	    }
	    if (!CollectionPrototype[TO_STRING_TAG$3]) {
	      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG$3, COLLECTION_NAME);
	    }
	    if (domIterables[COLLECTION_NAME]) for (var METHOD_NAME in es_array_iterator) {
	      // some Chrome versions have non-configurable methods on DOMTokenList
	      if (CollectionPrototype[METHOD_NAME] !== es_array_iterator[METHOD_NAME]) try {
	        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, es_array_iterator[METHOD_NAME]);
	      } catch (error) {
	        CollectionPrototype[METHOD_NAME] = es_array_iterator[METHOD_NAME];
	      }
	    }
	  }
	}

	var IS_CONCAT_SPREADABLE = wellKnownSymbol('isConcatSpreadable');
	var MAX_SAFE_INTEGER$1 = 0x1FFFFFFFFFFFFF;
	var MAXIMUM_ALLOWED_INDEX_EXCEEDED = 'Maximum allowed index exceeded';

	// We can't use this feature detection in V8 since it causes
	// deoptimization and serious performance degradation
	// https://github.com/zloirock/core-js/issues/679
	var IS_CONCAT_SPREADABLE_SUPPORT = v8Version >= 51 || !fails(function () {
	  var array = [];
	  array[IS_CONCAT_SPREADABLE] = false;
	  return array.concat()[0] !== array;
	});

	var SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('concat');

	var isConcatSpreadable = function (O) {
	  if (!isObject(O)) return false;
	  var spreadable = O[IS_CONCAT_SPREADABLE];
	  return spreadable !== undefined ? !!spreadable : isArray(O);
	};

	var FORCED = !IS_CONCAT_SPREADABLE_SUPPORT || !SPECIES_SUPPORT;

	// `Array.prototype.concat` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.concat
	// with adding support of @@isConcatSpreadable and @@species
	_export({ target: 'Array', proto: true, forced: FORCED }, {
	  concat: function concat(arg) { // eslint-disable-line no-unused-vars
	    var O = toObject(this);
	    var A = arraySpeciesCreate(O, 0);
	    var n = 0;
	    var i, k, length, len, E;
	    for (i = -1, length = arguments.length; i < length; i++) {
	      E = i === -1 ? O : arguments[i];
	      if (isConcatSpreadable(E)) {
	        len = toLength(E.length);
	        if (n + len > MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        for (k = 0; k < len; k++, n++) if (k in E) createProperty(A, n, E[k]);
	      } else {
	        if (n >= MAX_SAFE_INTEGER$1) throw TypeError(MAXIMUM_ALLOWED_INDEX_EXCEEDED);
	        createProperty(A, n++, E);
	      }
	    }
	    A.length = n;
	    return A;
	  }
	});

	var loggingEnabled_ = false;

	var Logger =
	/*#__PURE__*/
	function () {
	  function Logger() {
	    _classCallCheck(this, Logger);
	  }

	  _createClass(Logger, null, [{
	    key: "isLoggingEnabled",
	    value: function isLoggingEnabled() {
	      return loggingEnabled_;
	    }
	  }, {
	    key: "setLoggingEnabled",
	    value: function setLoggingEnabled(enabled) {
	      loggingEnabled_ = enabled;
	    }
	  }, {
	    key: "maybeLog",
	    value: function maybeLog(type) {
	      if (this.isLoggingEnabled()) {
	        var _console;

	        var d = new Date();

	        for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
	          args[_key - 1] = arguments[_key];
	        }

	        (_console = console).log.apply(_console, ['[' + d.toLocaleString() + '][THETA][' + type + ']'].concat(args));
	      }
	    }
	  }, {
	    key: "log",
	    value: function log() {
	      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
	        args[_key2] = arguments[_key2];
	      }

	      this.maybeLog.apply(this, ['log'].concat(args));
	    }
	  }, {
	    key: "info",
	    value: function info() {
	      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
	        args[_key3] = arguments[_key3];
	      }

	      this.maybeLog.apply(this, ['info'].concat(args));
	    }
	  }, {
	    key: "warn",
	    value: function warn() {
	      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
	        args[_key4] = arguments[_key4];
	      }

	      this.maybeLog.apply(this, ['warn'].concat(args));
	    }
	  }, {
	    key: "debug",
	    value: function debug() {
	      for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {
	        args[_key5] = arguments[_key5];
	      }

	      this.maybeLog.apply(this, ['debug'].concat(args));
	    }
	  }, {
	    key: "error",
	    value: function error() {
	      for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {
	        args[_key6] = arguments[_key6];
	      }

	      this.maybeLog.apply(this, ['error'].concat(args));
	    }
	  }]);

	  return Logger;
	}();

	var ThetaCache =
	/*#__PURE__*/
	function () {
	  function ThetaCache(config) {
	    _classCallCheck(this, ThetaCache);

	    var device = '';

	    if (navigator.userAgent) {
	      if (navigator.userAgent.match(/mobile/i)) {
	        device = 'Mobile';
	      } else if (navigator.userAgent.match(/iPad|Android|Touch/i)) {
	        device = 'Tablet';
	      } else if (navigator.userAgent.match(/Tizen/i)) {
	        device = 'TV';
	      } else {
	        device = 'Desktop';
	      }
	    }

	    this.maxSize = device === 'Desktop' ? 50 : 10;
	    this.cache_ = new Map();
	    this.cacheQueue_ = [];
	  }

	  _createClass(ThetaCache, [{
	    key: "start",
	    value: function start() {
	      var cacheCheckInterval = 60000;
	      this.cleanUpIntervalId = setInterval(this.cleanUp.bind(this), cacheCheckInterval);
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.clear();

	      if (this.cleanUpIntervalId) {
	        clearInterval(this.cleanUpIntervalId);
	      }
	    }
	  }, {
	    key: "has",
	    value: function has(key) {
	      return this.cache_.has(key);
	    }
	  }, {
	    key: "get",
	    value: function get(key) {
	      return this.cache_.get(key);
	    }
	  }, {
	    key: "set",
	    value: function set(key, value) {
	      this.cache_.set(key, value);
	      this.cacheQueue_.push(key);
	    }
	  }, {
	    key: "delete",
	    value: function _delete(key) {
	      this.cache_.delete(key);
	    }
	  }, {
	    key: "clear",
	    value: function clear() {
	      this.cache_.clear();
	      this.cacheQueue_ = [];
	    } // Garbage collection

	  }, {
	    key: "cleanUp",
	    value: function cleanUp() {
	      var cache = this.cache_;
	      var cacheQueue = this.cacheQueue_;

	      if (cacheQueue.length >= this.maxSize) {
	        Logger.info('Cache full. Cleaning up.');
	        var count = 0;
	        var lengthMark = cacheQueue.length - this.maxSize;

	        while (count < lengthMark) {
	          var key = cacheQueue.shift();
	          cache.delete(key);
	          count++;
	        }
	      }
	    }
	  }]);

	  return ThetaCache;
	}();

	var push = [].push;

	// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
	var createMethod$2 = function (TYPE) {
	  var IS_MAP = TYPE == 1;
	  var IS_FILTER = TYPE == 2;
	  var IS_SOME = TYPE == 3;
	  var IS_EVERY = TYPE == 4;
	  var IS_FIND_INDEX = TYPE == 6;
	  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
	  return function ($this, callbackfn, that, specificCreate) {
	    var O = toObject($this);
	    var self = indexedObject(O);
	    var boundFunction = bindContext(callbackfn, that, 3);
	    var length = toLength(self.length);
	    var index = 0;
	    var create = specificCreate || arraySpeciesCreate;
	    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
	    var value, result;
	    for (;length > index; index++) if (NO_HOLES || index in self) {
	      value = self[index];
	      result = boundFunction(value, index, O);
	      if (TYPE) {
	        if (IS_MAP) target[index] = result; // map
	        else if (result) switch (TYPE) {
	          case 3: return true;              // some
	          case 5: return value;             // find
	          case 6: return index;             // findIndex
	          case 2: push.call(target, value); // filter
	        } else if (IS_EVERY) return false;  // every
	      }
	    }
	    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
	  };
	};

	var arrayIteration = {
	  // `Array.prototype.forEach` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	  forEach: createMethod$2(0),
	  // `Array.prototype.map` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.map
	  map: createMethod$2(1),
	  // `Array.prototype.filter` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
	  filter: createMethod$2(2),
	  // `Array.prototype.some` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.some
	  some: createMethod$2(3),
	  // `Array.prototype.every` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.every
	  every: createMethod$2(4),
	  // `Array.prototype.find` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.find
	  find: createMethod$2(5),
	  // `Array.prototype.findIndex` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
	  findIndex: createMethod$2(6)
	};

	var $filter = arrayIteration.filter;



	var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
	// Edge 14- issue
	var USES_TO_LENGTH = HAS_SPECIES_SUPPORT && !fails(function () {
	  [].filter.call({ length: -1, 0: 1 }, function (it) { throw it; });
	});

	// `Array.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.filter
	// with adding support of @@species
	_export({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
	  filter: function filter(callbackfn /* , thisArg */) {
	    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	var SPECIES$4 = wellKnownSymbol('species');
	var nativeSlice = [].slice;
	var max$2 = Math.max;

	// `Array.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.slice
	// fallback for not array-like ES3 strings and DOM objects
	_export({ target: 'Array', proto: true, forced: !arrayMethodHasSpeciesSupport('slice') }, {
	  slice: function slice(start, end) {
	    var O = toIndexedObject(this);
	    var length = toLength(O.length);
	    var k = toAbsoluteIndex(start, length);
	    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
	    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
	    var Constructor, result, n;
	    if (isArray(O)) {
	      Constructor = O.constructor;
	      // cross-realm fallback
	      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
	        Constructor = undefined;
	      } else if (isObject(Constructor)) {
	        Constructor = Constructor[SPECIES$4];
	        if (Constructor === null) Constructor = undefined;
	      }
	      if (Constructor === Array || Constructor === undefined) {
	        return nativeSlice.call(O, k, fin);
	      }
	    }
	    result = new (Constructor === undefined ? Array : Constructor)(max$2(fin - k, 0));
	    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
	    result.length = n;
	    return result;
	  }
	});

	var defineProperty$2 = objectDefineProperty.f;





	var DataView = global_1.DataView;
	var DataViewPrototype = DataView && DataView.prototype;
	var Int8Array$1 = global_1.Int8Array;
	var Int8ArrayPrototype = Int8Array$1 && Int8Array$1.prototype;
	var Uint8ClampedArray = global_1.Uint8ClampedArray;
	var Uint8ClampedArrayPrototype = Uint8ClampedArray && Uint8ClampedArray.prototype;
	var TypedArray = Int8Array$1 && objectGetPrototypeOf(Int8Array$1);
	var TypedArrayPrototype = Int8ArrayPrototype && objectGetPrototypeOf(Int8ArrayPrototype);
	var ObjectPrototype$1 = Object.prototype;
	var isPrototypeOf = ObjectPrototype$1.isPrototypeOf;

	var TO_STRING_TAG$4 = wellKnownSymbol('toStringTag');
	var TYPED_ARRAY_TAG = uid('TYPED_ARRAY_TAG');
	var NATIVE_ARRAY_BUFFER = !!(global_1.ArrayBuffer && DataView);
	// Fixing native typed arrays in Opera Presto crashes the browser, see #595
	var NATIVE_ARRAY_BUFFER_VIEWS = NATIVE_ARRAY_BUFFER && !!objectSetPrototypeOf && classof(global_1.opera) !== 'Opera';
	var TYPED_ARRAY_TAG_REQIRED = false;
	var NAME;

	var TypedArrayConstructorsList = {
	  Int8Array: 1,
	  Uint8Array: 1,
	  Uint8ClampedArray: 1,
	  Int16Array: 2,
	  Uint16Array: 2,
	  Int32Array: 4,
	  Uint32Array: 4,
	  Float32Array: 4,
	  Float64Array: 8
	};

	var isView = function isView(it) {
	  var klass = classof(it);
	  return klass === 'DataView' || has(TypedArrayConstructorsList, klass);
	};

	var isTypedArray = function (it) {
	  return isObject(it) && has(TypedArrayConstructorsList, classof(it));
	};

	var aTypedArray = function (it) {
	  if (isTypedArray(it)) return it;
	  throw TypeError('Target is not a typed array');
	};

	var aTypedArrayConstructor = function (C) {
	  if (objectSetPrototypeOf) {
	    if (isPrototypeOf.call(TypedArray, C)) return C;
	  } else for (var ARRAY in TypedArrayConstructorsList) if (has(TypedArrayConstructorsList, NAME)) {
	    var TypedArrayConstructor = global_1[ARRAY];
	    if (TypedArrayConstructor && (C === TypedArrayConstructor || isPrototypeOf.call(TypedArrayConstructor, C))) {
	      return C;
	    }
	  } throw TypeError('Target is not a typed array constructor');
	};

	var exportTypedArrayMethod = function (KEY, property, forced) {
	  if (!descriptors) return;
	  if (forced) for (var ARRAY in TypedArrayConstructorsList) {
	    var TypedArrayConstructor = global_1[ARRAY];
	    if (TypedArrayConstructor && has(TypedArrayConstructor.prototype, KEY)) {
	      delete TypedArrayConstructor.prototype[KEY];
	    }
	  }
	  if (!TypedArrayPrototype[KEY] || forced) {
	    redefine(TypedArrayPrototype, KEY, forced ? property
	      : NATIVE_ARRAY_BUFFER_VIEWS && Int8ArrayPrototype[KEY] || property);
	  }
	};

	var exportTypedArrayStaticMethod = function (KEY, property, forced) {
	  var ARRAY, TypedArrayConstructor;
	  if (!descriptors) return;
	  if (objectSetPrototypeOf) {
	    if (forced) for (ARRAY in TypedArrayConstructorsList) {
	      TypedArrayConstructor = global_1[ARRAY];
	      if (TypedArrayConstructor && has(TypedArrayConstructor, KEY)) {
	        delete TypedArrayConstructor[KEY];
	      }
	    }
	    if (!TypedArray[KEY] || forced) {
	      // V8 ~ Chrome 49-50 `%TypedArray%` methods are non-writable non-configurable
	      try {
	        return redefine(TypedArray, KEY, forced ? property : NATIVE_ARRAY_BUFFER_VIEWS && Int8Array$1[KEY] || property);
	      } catch (error) { /* empty */ }
	    } else return;
	  }
	  for (ARRAY in TypedArrayConstructorsList) {
	    TypedArrayConstructor = global_1[ARRAY];
	    if (TypedArrayConstructor && (!TypedArrayConstructor[KEY] || forced)) {
	      redefine(TypedArrayConstructor, KEY, property);
	    }
	  }
	};

	for (NAME in TypedArrayConstructorsList) {
	  if (!global_1[NAME]) NATIVE_ARRAY_BUFFER_VIEWS = false;
	}

	// WebKit bug - typed arrays constructors prototype is Object.prototype
	if (!NATIVE_ARRAY_BUFFER_VIEWS || typeof TypedArray != 'function' || TypedArray === Function.prototype) {
	  // eslint-disable-next-line no-shadow
	  TypedArray = function TypedArray() {
	    throw TypeError('Incorrect invocation');
	  };
	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
	    if (global_1[NAME]) objectSetPrototypeOf(global_1[NAME], TypedArray);
	  }
	}

	if (!NATIVE_ARRAY_BUFFER_VIEWS || !TypedArrayPrototype || TypedArrayPrototype === ObjectPrototype$1) {
	  TypedArrayPrototype = TypedArray.prototype;
	  if (NATIVE_ARRAY_BUFFER_VIEWS) for (NAME in TypedArrayConstructorsList) {
	    if (global_1[NAME]) objectSetPrototypeOf(global_1[NAME].prototype, TypedArrayPrototype);
	  }
	}

	// WebKit bug - one more object in Uint8ClampedArray prototype chain
	if (NATIVE_ARRAY_BUFFER_VIEWS && objectGetPrototypeOf(Uint8ClampedArrayPrototype) !== TypedArrayPrototype) {
	  objectSetPrototypeOf(Uint8ClampedArrayPrototype, TypedArrayPrototype);
	}

	if (descriptors && !has(TypedArrayPrototype, TO_STRING_TAG$4)) {
	  TYPED_ARRAY_TAG_REQIRED = true;
	  defineProperty$2(TypedArrayPrototype, TO_STRING_TAG$4, { get: function () {
	    return isObject(this) ? this[TYPED_ARRAY_TAG] : undefined;
	  } });
	  for (NAME in TypedArrayConstructorsList) if (global_1[NAME]) {
	    createNonEnumerableProperty(global_1[NAME], TYPED_ARRAY_TAG, NAME);
	  }
	}

	// WebKit bug - the same parent prototype for typed arrays and data view
	if (NATIVE_ARRAY_BUFFER && objectSetPrototypeOf && objectGetPrototypeOf(DataViewPrototype) !== ObjectPrototype$1) {
	  objectSetPrototypeOf(DataViewPrototype, ObjectPrototype$1);
	}

	var arrayBufferViewCore = {
	  NATIVE_ARRAY_BUFFER: NATIVE_ARRAY_BUFFER,
	  NATIVE_ARRAY_BUFFER_VIEWS: NATIVE_ARRAY_BUFFER_VIEWS,
	  TYPED_ARRAY_TAG: TYPED_ARRAY_TAG_REQIRED && TYPED_ARRAY_TAG,
	  aTypedArray: aTypedArray,
	  aTypedArrayConstructor: aTypedArrayConstructor,
	  exportTypedArrayMethod: exportTypedArrayMethod,
	  exportTypedArrayStaticMethod: exportTypedArrayStaticMethod,
	  isView: isView,
	  isTypedArray: isTypedArray,
	  TypedArray: TypedArray,
	  TypedArrayPrototype: TypedArrayPrototype
	};

	// `ToIndex` abstract operation
	// https://tc39.github.io/ecma262/#sec-toindex
	var toIndex = function (it) {
	  if (it === undefined) return 0;
	  var number = toInteger(it);
	  var length = toLength(number);
	  if (number !== length) throw RangeError('Wrong length or index');
	  return length;
	};

	// IEEE754 conversions based on https://github.com/feross/ieee754
	// eslint-disable-next-line no-shadow-restricted-names
	var Infinity$1 = 1 / 0;
	var abs = Math.abs;
	var pow = Math.pow;
	var floor$1 = Math.floor;
	var log = Math.log;
	var LN2 = Math.LN2;

	var pack = function (number, mantissaLength, bytes) {
	  var buffer = new Array(bytes);
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var rt = mantissaLength === 23 ? pow(2, -24) - pow(2, -77) : 0;
	  var sign = number < 0 || number === 0 && 1 / number < 0 ? 1 : 0;
	  var index = 0;
	  var exponent, mantissa, c;
	  number = abs(number);
	  // eslint-disable-next-line no-self-compare
	  if (number != number || number === Infinity$1) {
	    // eslint-disable-next-line no-self-compare
	    mantissa = number != number ? 1 : 0;
	    exponent = eMax;
	  } else {
	    exponent = floor$1(log(number) / LN2);
	    if (number * (c = pow(2, -exponent)) < 1) {
	      exponent--;
	      c *= 2;
	    }
	    if (exponent + eBias >= 1) {
	      number += rt / c;
	    } else {
	      number += rt * pow(2, 1 - eBias);
	    }
	    if (number * c >= 2) {
	      exponent++;
	      c /= 2;
	    }
	    if (exponent + eBias >= eMax) {
	      mantissa = 0;
	      exponent = eMax;
	    } else if (exponent + eBias >= 1) {
	      mantissa = (number * c - 1) * pow(2, mantissaLength);
	      exponent = exponent + eBias;
	    } else {
	      mantissa = number * pow(2, eBias - 1) * pow(2, mantissaLength);
	      exponent = 0;
	    }
	  }
	  for (; mantissaLength >= 8; buffer[index++] = mantissa & 255, mantissa /= 256, mantissaLength -= 8);
	  exponent = exponent << mantissaLength | mantissa;
	  exponentLength += mantissaLength;
	  for (; exponentLength > 0; buffer[index++] = exponent & 255, exponent /= 256, exponentLength -= 8);
	  buffer[--index] |= sign * 128;
	  return buffer;
	};

	var unpack = function (buffer, mantissaLength) {
	  var bytes = buffer.length;
	  var exponentLength = bytes * 8 - mantissaLength - 1;
	  var eMax = (1 << exponentLength) - 1;
	  var eBias = eMax >> 1;
	  var nBits = exponentLength - 7;
	  var index = bytes - 1;
	  var sign = buffer[index--];
	  var exponent = sign & 127;
	  var mantissa;
	  sign >>= 7;
	  for (; nBits > 0; exponent = exponent * 256 + buffer[index], index--, nBits -= 8);
	  mantissa = exponent & (1 << -nBits) - 1;
	  exponent >>= -nBits;
	  nBits += mantissaLength;
	  for (; nBits > 0; mantissa = mantissa * 256 + buffer[index], index--, nBits -= 8);
	  if (exponent === 0) {
	    exponent = 1 - eBias;
	  } else if (exponent === eMax) {
	    return mantissa ? NaN : sign ? -Infinity$1 : Infinity$1;
	  } else {
	    mantissa = mantissa + pow(2, mantissaLength);
	    exponent = exponent - eBias;
	  } return (sign ? -1 : 1) * mantissa * pow(2, exponent - mantissaLength);
	};

	var ieee754 = {
	  pack: pack,
	  unpack: unpack
	};

	// `Array.prototype.fill` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.fill
	var arrayFill = function fill(value /* , start = 0, end = @length */) {
	  var O = toObject(this);
	  var length = toLength(O.length);
	  var argumentsLength = arguments.length;
	  var index = toAbsoluteIndex(argumentsLength > 1 ? arguments[1] : undefined, length);
	  var end = argumentsLength > 2 ? arguments[2] : undefined;
	  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
	  while (endPos > index) O[index++] = value;
	  return O;
	};

	var NATIVE_ARRAY_BUFFER$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER;








	var getOwnPropertyNames = objectGetOwnPropertyNames.f;
	var defineProperty$3 = objectDefineProperty.f;




	var getInternalState$2 = internalState.get;
	var setInternalState$3 = internalState.set;
	var ARRAY_BUFFER = 'ArrayBuffer';
	var DATA_VIEW = 'DataView';
	var PROTOTYPE$1 = 'prototype';
	var WRONG_LENGTH = 'Wrong length';
	var WRONG_INDEX = 'Wrong index';
	var NativeArrayBuffer = global_1[ARRAY_BUFFER];
	var $ArrayBuffer = NativeArrayBuffer;
	var $DataView = global_1[DATA_VIEW];
	var RangeError$1 = global_1.RangeError;

	var packIEEE754 = ieee754.pack;
	var unpackIEEE754 = ieee754.unpack;

	var packInt8 = function (number) {
	  return [number & 0xFF];
	};

	var packInt16 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF];
	};

	var packInt32 = function (number) {
	  return [number & 0xFF, number >> 8 & 0xFF, number >> 16 & 0xFF, number >> 24 & 0xFF];
	};

	var unpackInt32 = function (buffer) {
	  return buffer[3] << 24 | buffer[2] << 16 | buffer[1] << 8 | buffer[0];
	};

	var packFloat32 = function (number) {
	  return packIEEE754(number, 23, 4);
	};

	var packFloat64 = function (number) {
	  return packIEEE754(number, 52, 8);
	};

	var addGetter = function (Constructor, key) {
	  defineProperty$3(Constructor[PROTOTYPE$1], key, { get: function () { return getInternalState$2(this)[key]; } });
	};

	var get$1 = function (view, count, index, isLittleEndian) {
	  var intIndex = toIndex(index);
	  var store = getInternalState$2(view);
	  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
	  var bytes = getInternalState$2(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = bytes.slice(start, start + count);
	  return isLittleEndian ? pack : pack.reverse();
	};

	var set$1 = function (view, count, index, conversion, value, isLittleEndian) {
	  var intIndex = toIndex(index);
	  var store = getInternalState$2(view);
	  if (intIndex + count > store.byteLength) throw RangeError$1(WRONG_INDEX);
	  var bytes = getInternalState$2(store.buffer).bytes;
	  var start = intIndex + store.byteOffset;
	  var pack = conversion(+value);
	  for (var i = 0; i < count; i++) bytes[start + i] = pack[isLittleEndian ? i : count - i - 1];
	};

	if (!NATIVE_ARRAY_BUFFER$1) {
	  $ArrayBuffer = function ArrayBuffer(length) {
	    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
	    var byteLength = toIndex(length);
	    setInternalState$3(this, {
	      bytes: arrayFill.call(new Array(byteLength), 0),
	      byteLength: byteLength
	    });
	    if (!descriptors) this.byteLength = byteLength;
	  };

	  $DataView = function DataView(buffer, byteOffset, byteLength) {
	    anInstance(this, $DataView, DATA_VIEW);
	    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
	    var bufferLength = getInternalState$2(buffer).byteLength;
	    var offset = toInteger(byteOffset);
	    if (offset < 0 || offset > bufferLength) throw RangeError$1('Wrong offset');
	    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
	    if (offset + byteLength > bufferLength) throw RangeError$1(WRONG_LENGTH);
	    setInternalState$3(this, {
	      buffer: buffer,
	      byteLength: byteLength,
	      byteOffset: offset
	    });
	    if (!descriptors) {
	      this.buffer = buffer;
	      this.byteLength = byteLength;
	      this.byteOffset = offset;
	    }
	  };

	  if (descriptors) {
	    addGetter($ArrayBuffer, 'byteLength');
	    addGetter($DataView, 'buffer');
	    addGetter($DataView, 'byteLength');
	    addGetter($DataView, 'byteOffset');
	  }

	  redefineAll($DataView[PROTOTYPE$1], {
	    getInt8: function getInt8(byteOffset) {
	      return get$1(this, 1, byteOffset)[0] << 24 >> 24;
	    },
	    getUint8: function getUint8(byteOffset) {
	      return get$1(this, 1, byteOffset)[0];
	    },
	    getInt16: function getInt16(byteOffset /* , littleEndian */) {
	      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
	      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
	    },
	    getUint16: function getUint16(byteOffset /* , littleEndian */) {
	      var bytes = get$1(this, 2, byteOffset, arguments.length > 1 ? arguments[1] : undefined);
	      return bytes[1] << 8 | bytes[0];
	    },
	    getInt32: function getInt32(byteOffset /* , littleEndian */) {
	      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined));
	    },
	    getUint32: function getUint32(byteOffset /* , littleEndian */) {
	      return unpackInt32(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined)) >>> 0;
	    },
	    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get$1(this, 4, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 23);
	    },
	    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
	      return unpackIEEE754(get$1(this, 8, byteOffset, arguments.length > 1 ? arguments[1] : undefined), 52);
	    },
	    setInt8: function setInt8(byteOffset, value) {
	      set$1(this, 1, byteOffset, packInt8, value);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      set$1(this, 1, byteOffset, packInt8, value);
	    },
	    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
	      set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
	      set$1(this, 2, byteOffset, packInt16, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
	      set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
	      set$1(this, 4, byteOffset, packInt32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
	      set$1(this, 4, byteOffset, packFloat32, value, arguments.length > 2 ? arguments[2] : undefined);
	    },
	    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
	      set$1(this, 8, byteOffset, packFloat64, value, arguments.length > 2 ? arguments[2] : undefined);
	    }
	  });
	} else {
	  if (!fails(function () {
	    NativeArrayBuffer(1);
	  }) || !fails(function () {
	    new NativeArrayBuffer(-1); // eslint-disable-line no-new
	  }) || fails(function () {
	    new NativeArrayBuffer(); // eslint-disable-line no-new
	    new NativeArrayBuffer(1.5); // eslint-disable-line no-new
	    new NativeArrayBuffer(NaN); // eslint-disable-line no-new
	    return NativeArrayBuffer.name != ARRAY_BUFFER;
	  })) {
	    $ArrayBuffer = function ArrayBuffer(length) {
	      anInstance(this, $ArrayBuffer);
	      return new NativeArrayBuffer(toIndex(length));
	    };
	    var ArrayBufferPrototype = $ArrayBuffer[PROTOTYPE$1] = NativeArrayBuffer[PROTOTYPE$1];
	    for (var keys$1 = getOwnPropertyNames(NativeArrayBuffer), j = 0, key; keys$1.length > j;) {
	      if (!((key = keys$1[j++]) in $ArrayBuffer)) {
	        createNonEnumerableProperty($ArrayBuffer, key, NativeArrayBuffer[key]);
	      }
	    }
	    ArrayBufferPrototype.constructor = $ArrayBuffer;
	  }
	  // iOS Safari 7.x bug
	  var testView = new $DataView(new $ArrayBuffer(2));
	  var nativeSetInt8 = $DataView[PROTOTYPE$1].setInt8;
	  testView.setInt8(0, 2147483648);
	  testView.setInt8(1, 2147483649);
	  if (testView.getInt8(0) || !testView.getInt8(1)) redefineAll($DataView[PROTOTYPE$1], {
	    setInt8: function setInt8(byteOffset, value) {
	      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
	    },
	    setUint8: function setUint8(byteOffset, value) {
	      nativeSetInt8.call(this, byteOffset, value << 24 >> 24);
	    }
	  }, { unsafe: true });
	}

	setToStringTag($ArrayBuffer, ARRAY_BUFFER);
	setToStringTag($DataView, DATA_VIEW);

	var arrayBuffer = {
	  ArrayBuffer: $ArrayBuffer,
	  DataView: $DataView
	};

	var ARRAY_BUFFER$1 = 'ArrayBuffer';
	var ArrayBuffer$1 = arrayBuffer[ARRAY_BUFFER$1];
	var NativeArrayBuffer$1 = global_1[ARRAY_BUFFER$1];

	// `ArrayBuffer` constructor
	// https://tc39.github.io/ecma262/#sec-arraybuffer-constructor
	_export({ global: true, forced: NativeArrayBuffer$1 !== ArrayBuffer$1 }, {
	  ArrayBuffer: ArrayBuffer$1
	});

	setSpecies(ARRAY_BUFFER$1);

	// a string of all valid unicode whitespaces
	// eslint-disable-next-line max-len
	var whitespaces = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

	var whitespace = '[' + whitespaces + ']';
	var ltrim = RegExp('^' + whitespace + whitespace + '*');
	var rtrim = RegExp(whitespace + whitespace + '*$');

	// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
	var createMethod$3 = function (TYPE) {
	  return function ($this) {
	    var string = String(requireObjectCoercible($this));
	    if (TYPE & 1) string = string.replace(ltrim, '');
	    if (TYPE & 2) string = string.replace(rtrim, '');
	    return string;
	  };
	};

	var stringTrim = {
	  // `String.prototype.{ trimLeft, trimStart }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
	  start: createMethod$3(1),
	  // `String.prototype.{ trimRight, trimEnd }` methods
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
	  end: createMethod$3(2),
	  // `String.prototype.trim` method
	  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
	  trim: createMethod$3(3)
	};

	var getOwnPropertyNames$1 = objectGetOwnPropertyNames.f;
	var getOwnPropertyDescriptor$2 = objectGetOwnPropertyDescriptor.f;
	var defineProperty$4 = objectDefineProperty.f;
	var trim = stringTrim.trim;

	var NUMBER = 'Number';
	var NativeNumber = global_1[NUMBER];
	var NumberPrototype = NativeNumber.prototype;

	// Opera ~12 has broken Object#toString
	var BROKEN_CLASSOF = classofRaw(objectCreate(NumberPrototype)) == NUMBER;

	// `ToNumber` abstract operation
	// https://tc39.github.io/ecma262/#sec-tonumber
	var toNumber = function (argument) {
	  var it = toPrimitive(argument, false);
	  var first, third, radix, maxCode, digits, length, index, code;
	  if (typeof it == 'string' && it.length > 2) {
	    it = trim(it);
	    first = it.charCodeAt(0);
	    if (first === 43 || first === 45) {
	      third = it.charCodeAt(2);
	      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
	    } else if (first === 48) {
	      switch (it.charCodeAt(1)) {
	        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
	        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
	        default: return +it;
	      }
	      digits = it.slice(2);
	      length = digits.length;
	      for (index = 0; index < length; index++) {
	        code = digits.charCodeAt(index);
	        // parseInt parses a string to a first unavailable symbol
	        // but ToNumber should return NaN if a string contains unavailable symbols
	        if (code < 48 || code > maxCode) return NaN;
	      } return parseInt(digits, radix);
	    }
	  } return +it;
	};

	// `Number` constructor
	// https://tc39.github.io/ecma262/#sec-number-constructor
	if (isForced_1(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
	  var NumberWrapper = function Number(value) {
	    var it = arguments.length < 1 ? 0 : value;
	    var dummy = this;
	    return dummy instanceof NumberWrapper
	      // check on 1..constructor(foo) case
	      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classofRaw(dummy) != NUMBER)
	        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
	  };
	  for (var keys$2 = descriptors ? getOwnPropertyNames$1(NativeNumber) : (
	    // ES3:
	    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
	    // ES2015 (in case, if modules with ES2015 Number statics required before):
	    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
	    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
	  ).split(','), j$1 = 0, key$1; keys$2.length > j$1; j$1++) {
	    if (has(NativeNumber, key$1 = keys$2[j$1]) && !has(NumberWrapper, key$1)) {
	      defineProperty$4(NumberWrapper, key$1, getOwnPropertyDescriptor$2(NativeNumber, key$1));
	    }
	  }
	  NumberWrapper.prototype = NumberPrototype;
	  NumberPrototype.constructor = NumberWrapper;
	  redefine(global_1, NUMBER, NumberWrapper);
	}

	var floor$2 = Math.floor;

	// `Number.isInteger` method implementation
	// https://tc39.github.io/ecma262/#sec-number.isinteger
	var isInteger = function isInteger(it) {
	  return !isObject(it) && isFinite(it) && floor$2(it) === it;
	};

	// `Number.isInteger` method
	// https://tc39.github.io/ecma262/#sec-number.isinteger
	_export({ target: 'Number', stat: true }, {
	  isInteger: isInteger
	});

	var FAILS_ON_PRIMITIVES = fails(function () { objectKeys(1); });

	// `Object.keys` method
	// https://tc39.github.io/ecma262/#sec-object.keys
	_export({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
	  keys: function keys(it) {
	    return objectKeys(toObject(it));
	  }
	});

	var nativePromiseConstructor = global_1.Promise;

	var SPECIES$5 = wellKnownSymbol('species');

	// `SpeciesConstructor` abstract operation
	// https://tc39.github.io/ecma262/#sec-speciesconstructor
	var speciesConstructor = function (O, defaultConstructor) {
	  var C = anObject(O).constructor;
	  var S;
	  return C === undefined || (S = anObject(C)[SPECIES$5]) == undefined ? defaultConstructor : aFunction$1(S);
	};

	var isIos = /(iphone|ipod|ipad).*applewebkit/i.test(userAgent);

	var location$1 = global_1.location;
	var set$2 = global_1.setImmediate;
	var clear = global_1.clearImmediate;
	var process$2 = global_1.process;
	var MessageChannel = global_1.MessageChannel;
	var Dispatch = global_1.Dispatch;
	var counter = 0;
	var queue = {};
	var ONREADYSTATECHANGE = 'onreadystatechange';
	var defer, channel, port;

	var run = function (id) {
	  // eslint-disable-next-line no-prototype-builtins
	  if (queue.hasOwnProperty(id)) {
	    var fn = queue[id];
	    delete queue[id];
	    fn();
	  }
	};

	var runner = function (id) {
	  return function () {
	    run(id);
	  };
	};

	var listener = function (event) {
	  run(event.data);
	};

	var post = function (id) {
	  // old engines have not location.origin
	  global_1.postMessage(id + '', location$1.protocol + '//' + location$1.host);
	};

	// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
	if (!set$2 || !clear) {
	  set$2 = function setImmediate(fn) {
	    var args = [];
	    var i = 1;
	    while (arguments.length > i) args.push(arguments[i++]);
	    queue[++counter] = function () {
	      // eslint-disable-next-line no-new-func
	      (typeof fn == 'function' ? fn : Function(fn)).apply(undefined, args);
	    };
	    defer(counter);
	    return counter;
	  };
	  clear = function clearImmediate(id) {
	    delete queue[id];
	  };
	  // Node.js 0.8-
	  if (classofRaw(process$2) == 'process') {
	    defer = function (id) {
	      process$2.nextTick(runner(id));
	    };
	  // Sphere (JS game engine) Dispatch API
	  } else if (Dispatch && Dispatch.now) {
	    defer = function (id) {
	      Dispatch.now(runner(id));
	    };
	  // Browsers with MessageChannel, includes WebWorkers
	  // except iOS - https://github.com/zloirock/core-js/issues/624
	  } else if (MessageChannel && !isIos) {
	    channel = new MessageChannel();
	    port = channel.port2;
	    channel.port1.onmessage = listener;
	    defer = bindContext(port.postMessage, port, 1);
	  // Browsers with postMessage, skip WebWorkers
	  // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
	  } else if (global_1.addEventListener && typeof postMessage == 'function' && !global_1.importScripts && !fails(post)) {
	    defer = post;
	    global_1.addEventListener('message', listener, false);
	  // IE8-
	  } else if (ONREADYSTATECHANGE in documentCreateElement('script')) {
	    defer = function (id) {
	      html.appendChild(documentCreateElement('script'))[ONREADYSTATECHANGE] = function () {
	        html.removeChild(this);
	        run(id);
	      };
	    };
	  // Rest old browsers
	  } else {
	    defer = function (id) {
	      setTimeout(runner(id), 0);
	    };
	  }
	}

	var task = {
	  set: set$2,
	  clear: clear
	};

	var getOwnPropertyDescriptor$3 = objectGetOwnPropertyDescriptor.f;

	var macrotask = task.set;


	var MutationObserver = global_1.MutationObserver || global_1.WebKitMutationObserver;
	var process$3 = global_1.process;
	var Promise$1 = global_1.Promise;
	var IS_NODE = classofRaw(process$3) == 'process';
	// Node.js 11 shows ExperimentalWarning on getting `queueMicrotask`
	var queueMicrotaskDescriptor = getOwnPropertyDescriptor$3(global_1, 'queueMicrotask');
	var queueMicrotask = queueMicrotaskDescriptor && queueMicrotaskDescriptor.value;

	var flush, head, last, notify, toggle, node, promise, then;

	// modern engines have queueMicrotask method
	if (!queueMicrotask) {
	  flush = function () {
	    var parent, fn;
	    if (IS_NODE && (parent = process$3.domain)) parent.exit();
	    while (head) {
	      fn = head.fn;
	      head = head.next;
	      try {
	        fn();
	      } catch (error) {
	        if (head) notify();
	        else last = undefined;
	        throw error;
	      }
	    } last = undefined;
	    if (parent) parent.enter();
	  };

	  // Node.js
	  if (IS_NODE) {
	    notify = function () {
	      process$3.nextTick(flush);
	    };
	  // browsers with MutationObserver, except iOS - https://github.com/zloirock/core-js/issues/339
	  } else if (MutationObserver && !isIos) {
	    toggle = true;
	    node = document.createTextNode('');
	    new MutationObserver(flush).observe(node, { characterData: true });
	    notify = function () {
	      node.data = toggle = !toggle;
	    };
	  // environments with maybe non-completely correct, but existent Promise
	  } else if (Promise$1 && Promise$1.resolve) {
	    // Promise.resolve without an argument throws an error in LG WebOS 2
	    promise = Promise$1.resolve(undefined);
	    then = promise.then;
	    notify = function () {
	      then.call(promise, flush);
	    };
	  // for other environments - macrotask based on:
	  // - setImmediate
	  // - MessageChannel
	  // - window.postMessag
	  // - onreadystatechange
	  // - setTimeout
	  } else {
	    notify = function () {
	      // strange IE + webpack dev server bug - use .call(global)
	      macrotask.call(global_1, flush);
	    };
	  }
	}

	var microtask = queueMicrotask || function (fn) {
	  var task = { fn: fn, next: undefined };
	  if (last) last.next = task;
	  if (!head) {
	    head = task;
	    notify();
	  } last = task;
	};

	var PromiseCapability = function (C) {
	  var resolve, reject;
	  this.promise = new C(function ($$resolve, $$reject) {
	    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
	    resolve = $$resolve;
	    reject = $$reject;
	  });
	  this.resolve = aFunction$1(resolve);
	  this.reject = aFunction$1(reject);
	};

	// 25.4.1.5 NewPromiseCapability(C)
	var f$5 = function (C) {
	  return new PromiseCapability(C);
	};

	var newPromiseCapability = {
		f: f$5
	};

	var promiseResolve = function (C, x) {
	  anObject(C);
	  if (isObject(x) && x.constructor === C) return x;
	  var promiseCapability = newPromiseCapability.f(C);
	  var resolve = promiseCapability.resolve;
	  resolve(x);
	  return promiseCapability.promise;
	};

	var hostReportErrors = function (a, b) {
	  var console = global_1.console;
	  if (console && console.error) {
	    arguments.length === 1 ? console.error(a) : console.error(a, b);
	  }
	};

	var perform = function (exec) {
	  try {
	    return { error: false, value: exec() };
	  } catch (error) {
	    return { error: true, value: error };
	  }
	};

	var task$1 = task.set;










	var SPECIES$6 = wellKnownSymbol('species');
	var PROMISE = 'Promise';
	var getInternalState$3 = internalState.get;
	var setInternalState$4 = internalState.set;
	var getInternalPromiseState = internalState.getterFor(PROMISE);
	var PromiseConstructor = nativePromiseConstructor;
	var TypeError$1 = global_1.TypeError;
	var document$2 = global_1.document;
	var process$4 = global_1.process;
	var $fetch = getBuiltIn('fetch');
	var newPromiseCapability$1 = newPromiseCapability.f;
	var newGenericPromiseCapability = newPromiseCapability$1;
	var IS_NODE$1 = classofRaw(process$4) == 'process';
	var DISPATCH_EVENT = !!(document$2 && document$2.createEvent && global_1.dispatchEvent);
	var UNHANDLED_REJECTION = 'unhandledrejection';
	var REJECTION_HANDLED = 'rejectionhandled';
	var PENDING = 0;
	var FULFILLED = 1;
	var REJECTED = 2;
	var HANDLED = 1;
	var UNHANDLED = 2;
	var Internal, OwnPromiseCapability, PromiseWrapper, nativeThen;

	var FORCED$1 = isForced_1(PROMISE, function () {
	  var GLOBAL_CORE_JS_PROMISE = inspectSource(PromiseConstructor) !== String(PromiseConstructor);
	  if (!GLOBAL_CORE_JS_PROMISE) {
	    // V8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
	    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
	    // We can't detect it synchronously, so just check versions
	    if (v8Version === 66) return true;
	    // Unhandled rejections tracking support, NodeJS Promise without it fails @@species test
	    if (!IS_NODE$1 && typeof PromiseRejectionEvent != 'function') return true;
	  }
	  // We can't use @@species feature detection in V8 since it causes
	  // deoptimization and performance degradation
	  // https://github.com/zloirock/core-js/issues/679
	  if (v8Version >= 51 && /native code/.test(PromiseConstructor)) return false;
	  // Detect correctness of subclassing with @@species support
	  var promise = PromiseConstructor.resolve(1);
	  var FakePromise = function (exec) {
	    exec(function () { /* empty */ }, function () { /* empty */ });
	  };
	  var constructor = promise.constructor = {};
	  constructor[SPECIES$6] = FakePromise;
	  return !(promise.then(function () { /* empty */ }) instanceof FakePromise);
	});

	var INCORRECT_ITERATION = FORCED$1 || !checkCorrectnessOfIteration(function (iterable) {
	  PromiseConstructor.all(iterable)['catch'](function () { /* empty */ });
	});

	// helpers
	var isThenable = function (it) {
	  var then;
	  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
	};

	var notify$1 = function (promise, state, isReject) {
	  if (state.notified) return;
	  state.notified = true;
	  var chain = state.reactions;
	  microtask(function () {
	    var value = state.value;
	    var ok = state.state == FULFILLED;
	    var index = 0;
	    // variable length - can't use forEach
	    while (chain.length > index) {
	      var reaction = chain[index++];
	      var handler = ok ? reaction.ok : reaction.fail;
	      var resolve = reaction.resolve;
	      var reject = reaction.reject;
	      var domain = reaction.domain;
	      var result, then, exited;
	      try {
	        if (handler) {
	          if (!ok) {
	            if (state.rejection === UNHANDLED) onHandleUnhandled(promise, state);
	            state.rejection = HANDLED;
	          }
	          if (handler === true) result = value;
	          else {
	            if (domain) domain.enter();
	            result = handler(value); // can throw
	            if (domain) {
	              domain.exit();
	              exited = true;
	            }
	          }
	          if (result === reaction.promise) {
	            reject(TypeError$1('Promise-chain cycle'));
	          } else if (then = isThenable(result)) {
	            then.call(result, resolve, reject);
	          } else resolve(result);
	        } else reject(value);
	      } catch (error) {
	        if (domain && !exited) domain.exit();
	        reject(error);
	      }
	    }
	    state.reactions = [];
	    state.notified = false;
	    if (isReject && !state.rejection) onUnhandled(promise, state);
	  });
	};

	var dispatchEvent = function (name, promise, reason) {
	  var event, handler;
	  if (DISPATCH_EVENT) {
	    event = document$2.createEvent('Event');
	    event.promise = promise;
	    event.reason = reason;
	    event.initEvent(name, false, true);
	    global_1.dispatchEvent(event);
	  } else event = { promise: promise, reason: reason };
	  if (handler = global_1['on' + name]) handler(event);
	  else if (name === UNHANDLED_REJECTION) hostReportErrors('Unhandled promise rejection', reason);
	};

	var onUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    var value = state.value;
	    var IS_UNHANDLED = isUnhandled(state);
	    var result;
	    if (IS_UNHANDLED) {
	      result = perform(function () {
	        if (IS_NODE$1) {
	          process$4.emit('unhandledRejection', value, promise);
	        } else dispatchEvent(UNHANDLED_REJECTION, promise, value);
	      });
	      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
	      state.rejection = IS_NODE$1 || isUnhandled(state) ? UNHANDLED : HANDLED;
	      if (result.error) throw result.value;
	    }
	  });
	};

	var isUnhandled = function (state) {
	  return state.rejection !== HANDLED && !state.parent;
	};

	var onHandleUnhandled = function (promise, state) {
	  task$1.call(global_1, function () {
	    if (IS_NODE$1) {
	      process$4.emit('rejectionHandled', promise);
	    } else dispatchEvent(REJECTION_HANDLED, promise, state.value);
	  });
	};

	var bind = function (fn, promise, state, unwrap) {
	  return function (value) {
	    fn(promise, state, value, unwrap);
	  };
	};

	var internalReject = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  state.value = value;
	  state.state = REJECTED;
	  notify$1(promise, state, true);
	};

	var internalResolve = function (promise, state, value, unwrap) {
	  if (state.done) return;
	  state.done = true;
	  if (unwrap) state = unwrap;
	  try {
	    if (promise === value) throw TypeError$1("Promise can't be resolved itself");
	    var then = isThenable(value);
	    if (then) {
	      microtask(function () {
	        var wrapper = { done: false };
	        try {
	          then.call(value,
	            bind(internalResolve, promise, wrapper, state),
	            bind(internalReject, promise, wrapper, state)
	          );
	        } catch (error) {
	          internalReject(promise, wrapper, error, state);
	        }
	      });
	    } else {
	      state.value = value;
	      state.state = FULFILLED;
	      notify$1(promise, state, false);
	    }
	  } catch (error) {
	    internalReject(promise, { done: false }, error, state);
	  }
	};

	// constructor polyfill
	if (FORCED$1) {
	  // 25.4.3.1 Promise(executor)
	  PromiseConstructor = function Promise(executor) {
	    anInstance(this, PromiseConstructor, PROMISE);
	    aFunction$1(executor);
	    Internal.call(this);
	    var state = getInternalState$3(this);
	    try {
	      executor(bind(internalResolve, this, state), bind(internalReject, this, state));
	    } catch (error) {
	      internalReject(this, state, error);
	    }
	  };
	  // eslint-disable-next-line no-unused-vars
	  Internal = function Promise(executor) {
	    setInternalState$4(this, {
	      type: PROMISE,
	      done: false,
	      notified: false,
	      parent: false,
	      reactions: [],
	      rejection: false,
	      state: PENDING,
	      value: undefined
	    });
	  };
	  Internal.prototype = redefineAll(PromiseConstructor.prototype, {
	    // `Promise.prototype.then` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.then
	    then: function then(onFulfilled, onRejected) {
	      var state = getInternalPromiseState(this);
	      var reaction = newPromiseCapability$1(speciesConstructor(this, PromiseConstructor));
	      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
	      reaction.fail = typeof onRejected == 'function' && onRejected;
	      reaction.domain = IS_NODE$1 ? process$4.domain : undefined;
	      state.parent = true;
	      state.reactions.push(reaction);
	      if (state.state != PENDING) notify$1(this, state, false);
	      return reaction.promise;
	    },
	    // `Promise.prototype.catch` method
	    // https://tc39.github.io/ecma262/#sec-promise.prototype.catch
	    'catch': function (onRejected) {
	      return this.then(undefined, onRejected);
	    }
	  });
	  OwnPromiseCapability = function () {
	    var promise = new Internal();
	    var state = getInternalState$3(promise);
	    this.promise = promise;
	    this.resolve = bind(internalResolve, promise, state);
	    this.reject = bind(internalReject, promise, state);
	  };
	  newPromiseCapability.f = newPromiseCapability$1 = function (C) {
	    return C === PromiseConstructor || C === PromiseWrapper
	      ? new OwnPromiseCapability(C)
	      : newGenericPromiseCapability(C);
	  };

	  if ( typeof nativePromiseConstructor == 'function') {
	    nativeThen = nativePromiseConstructor.prototype.then;

	    // wrap native Promise#then for native async functions
	    redefine(nativePromiseConstructor.prototype, 'then', function then(onFulfilled, onRejected) {
	      var that = this;
	      return new PromiseConstructor(function (resolve, reject) {
	        nativeThen.call(that, resolve, reject);
	      }).then(onFulfilled, onRejected);
	    // https://github.com/zloirock/core-js/issues/640
	    }, { unsafe: true });

	    // wrap fetch result
	    if (typeof $fetch == 'function') _export({ global: true, enumerable: true, forced: true }, {
	      // eslint-disable-next-line no-unused-vars
	      fetch: function fetch(input /* , init */) {
	        return promiseResolve(PromiseConstructor, $fetch.apply(global_1, arguments));
	      }
	    });
	  }
	}

	_export({ global: true, wrap: true, forced: FORCED$1 }, {
	  Promise: PromiseConstructor
	});

	setToStringTag(PromiseConstructor, PROMISE, false);
	setSpecies(PROMISE);

	PromiseWrapper = getBuiltIn(PROMISE);

	// statics
	_export({ target: PROMISE, stat: true, forced: FORCED$1 }, {
	  // `Promise.reject` method
	  // https://tc39.github.io/ecma262/#sec-promise.reject
	  reject: function reject(r) {
	    var capability = newPromiseCapability$1(this);
	    capability.reject.call(undefined, r);
	    return capability.promise;
	  }
	});

	_export({ target: PROMISE, stat: true, forced:  FORCED$1 }, {
	  // `Promise.resolve` method
	  // https://tc39.github.io/ecma262/#sec-promise.resolve
	  resolve: function resolve(x) {
	    return promiseResolve( this, x);
	  }
	});

	_export({ target: PROMISE, stat: true, forced: INCORRECT_ITERATION }, {
	  // `Promise.all` method
	  // https://tc39.github.io/ecma262/#sec-promise.all
	  all: function all(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var resolve = capability.resolve;
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      var values = [];
	      var counter = 0;
	      var remaining = 1;
	      iterate_1(iterable, function (promise) {
	        var index = counter++;
	        var alreadyCalled = false;
	        values.push(undefined);
	        remaining++;
	        $promiseResolve.call(C, promise).then(function (value) {
	          if (alreadyCalled) return;
	          alreadyCalled = true;
	          values[index] = value;
	          --remaining || resolve(values);
	        }, reject);
	      });
	      --remaining || resolve(values);
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  },
	  // `Promise.race` method
	  // https://tc39.github.io/ecma262/#sec-promise.race
	  race: function race(iterable) {
	    var C = this;
	    var capability = newPromiseCapability$1(C);
	    var reject = capability.reject;
	    var result = perform(function () {
	      var $promiseResolve = aFunction$1(C.resolve);
	      iterate_1(iterable, function (promise) {
	        $promiseResolve.call(C, promise).then(capability.resolve, reject);
	      });
	    });
	    if (result.error) reject(result.value);
	    return capability.promise;
	  }
	});

	// `Set` constructor
	// https://tc39.github.io/ecma262/#sec-set-objects
	var es_set = collection('Set', function (init) {
	  return function Set() { return init(this, arguments.length ? arguments[0] : undefined); };
	}, collectionStrong);

	var MATCH = wellKnownSymbol('match');

	// `IsRegExp` abstract operation
	// https://tc39.github.io/ecma262/#sec-isregexp
	var isRegexp = function (it) {
	  var isRegExp;
	  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classofRaw(it) == 'RegExp');
	};

	var arrayPush = [].push;
	var min$3 = Math.min;
	var MAX_UINT32 = 0xFFFFFFFF;

	// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
	var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

	// @@split logic
	fixRegexpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
	  var internalSplit;
	  if (
	    'abbc'.split(/(b)*/)[1] == 'c' ||
	    'test'.split(/(?:)/, -1).length != 4 ||
	    'ab'.split(/(?:ab)*/).length != 2 ||
	    '.'.split(/(.?)(.?)/).length != 4 ||
	    '.'.split(/()()/).length > 1 ||
	    ''.split(/.?/).length
	  ) {
	    // based on es5-shim implementation, need to rework it
	    internalSplit = function (separator, limit) {
	      var string = String(requireObjectCoercible(this));
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (separator === undefined) return [string];
	      // If `separator` is not a regex, use native split
	      if (!isRegexp(separator)) {
	        return nativeSplit.call(string, separator, lim);
	      }
	      var output = [];
	      var flags = (separator.ignoreCase ? 'i' : '') +
	                  (separator.multiline ? 'm' : '') +
	                  (separator.unicode ? 'u' : '') +
	                  (separator.sticky ? 'y' : '');
	      var lastLastIndex = 0;
	      // Make `global` and avoid `lastIndex` issues by working with a copy
	      var separatorCopy = new RegExp(separator.source, flags + 'g');
	      var match, lastIndex, lastLength;
	      while (match = regexpExec.call(separatorCopy, string)) {
	        lastIndex = separatorCopy.lastIndex;
	        if (lastIndex > lastLastIndex) {
	          output.push(string.slice(lastLastIndex, match.index));
	          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
	          lastLength = match[0].length;
	          lastLastIndex = lastIndex;
	          if (output.length >= lim) break;
	        }
	        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
	      }
	      if (lastLastIndex === string.length) {
	        if (lastLength || !separatorCopy.test('')) output.push('');
	      } else output.push(string.slice(lastLastIndex));
	      return output.length > lim ? output.slice(0, lim) : output;
	    };
	  // Chakra, V8
	  } else if ('0'.split(undefined, 0).length) {
	    internalSplit = function (separator, limit) {
	      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
	    };
	  } else internalSplit = nativeSplit;

	  return [
	    // `String.prototype.split` method
	    // https://tc39.github.io/ecma262/#sec-string.prototype.split
	    function split(separator, limit) {
	      var O = requireObjectCoercible(this);
	      var splitter = separator == undefined ? undefined : separator[SPLIT];
	      return splitter !== undefined
	        ? splitter.call(separator, O, limit)
	        : internalSplit.call(String(O), separator, limit);
	    },
	    // `RegExp.prototype[@@split]` method
	    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
	    //
	    // NOTE: This cannot be properly polyfilled in engines that don't support
	    // the 'y' flag.
	    function (regexp, limit) {
	      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
	      if (res.done) return res.value;

	      var rx = anObject(regexp);
	      var S = String(this);
	      var C = speciesConstructor(rx, RegExp);

	      var unicodeMatching = rx.unicode;
	      var flags = (rx.ignoreCase ? 'i' : '') +
	                  (rx.multiline ? 'm' : '') +
	                  (rx.unicode ? 'u' : '') +
	                  (SUPPORTS_Y ? 'y' : 'g');

	      // ^(? + rx + ) is needed, in combination with some S slicing, to
	      // simulate the 'y' flag.
	      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
	      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
	      if (lim === 0) return [];
	      if (S.length === 0) return regexpExecAbstract(splitter, S) === null ? [S] : [];
	      var p = 0;
	      var q = 0;
	      var A = [];
	      while (q < S.length) {
	        splitter.lastIndex = SUPPORTS_Y ? q : 0;
	        var z = regexpExecAbstract(splitter, SUPPORTS_Y ? S : S.slice(q));
	        var e;
	        if (
	          z === null ||
	          (e = min$3(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
	        ) {
	          q = advanceStringIndex(S, q, unicodeMatching);
	        } else {
	          A.push(S.slice(p, q));
	          if (A.length === lim) return A;
	          for (var i = 1; i <= z.length - 1; i++) {
	            A.push(z[i]);
	            if (A.length === lim) return A;
	          }
	          q = p = e;
	        }
	      }
	      A.push(S.slice(p));
	      return A;
	    }
	  ];
	}, !SUPPORTS_Y);

	/* eslint-disable no-new */



	var NATIVE_ARRAY_BUFFER_VIEWS$1 = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;

	var ArrayBuffer$2 = global_1.ArrayBuffer;
	var Int8Array$2 = global_1.Int8Array;

	var typedArraysConstructorsRequiresWrappers = !NATIVE_ARRAY_BUFFER_VIEWS$1 || !fails(function () {
	  Int8Array$2(1);
	}) || !fails(function () {
	  new Int8Array$2(-1);
	}) || !checkCorrectnessOfIteration(function (iterable) {
	  new Int8Array$2();
	  new Int8Array$2(null);
	  new Int8Array$2(1.5);
	  new Int8Array$2(iterable);
	}, true) || fails(function () {
	  // Safari (11+) bug - a reason why even Safari 13 should load a typed array polyfill
	  return new Int8Array$2(new ArrayBuffer$2(2), 1, undefined).length !== 1;
	});

	var toPositiveInteger = function (it) {
	  var result = toInteger(it);
	  if (result < 0) throw RangeError("The argument can't be less than 0");
	  return result;
	};

	var toOffset = function (it, BYTES) {
	  var offset = toPositiveInteger(it);
	  if (offset % BYTES) throw RangeError('Wrong offset');
	  return offset;
	};

	var aTypedArrayConstructor$1 = arrayBufferViewCore.aTypedArrayConstructor;

	var typedArrayFrom = function from(source /* , mapfn, thisArg */) {
	  var O = toObject(source);
	  var argumentsLength = arguments.length;
	  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
	  var mapping = mapfn !== undefined;
	  var iteratorMethod = getIteratorMethod(O);
	  var i, length, result, step, iterator, next;
	  if (iteratorMethod != undefined && !isArrayIteratorMethod(iteratorMethod)) {
	    iterator = iteratorMethod.call(O);
	    next = iterator.next;
	    O = [];
	    while (!(step = next.call(iterator)).done) {
	      O.push(step.value);
	    }
	  }
	  if (mapping && argumentsLength > 2) {
	    mapfn = bindContext(mapfn, arguments[2], 2);
	  }
	  length = toLength(O.length);
	  result = new (aTypedArrayConstructor$1(this))(length);
	  for (i = 0; length > i; i++) {
	    result[i] = mapping ? mapfn(O[i], i) : O[i];
	  }
	  return result;
	};

	var typedArrayConstructor = createCommonjsModule(function (module) {


















	var getOwnPropertyNames = objectGetOwnPropertyNames.f;

	var forEach = arrayIteration.forEach;






	var getInternalState = internalState.get;
	var setInternalState = internalState.set;
	var nativeDefineProperty = objectDefineProperty.f;
	var nativeGetOwnPropertyDescriptor = objectGetOwnPropertyDescriptor.f;
	var round = Math.round;
	var RangeError = global_1.RangeError;
	var ArrayBuffer = arrayBuffer.ArrayBuffer;
	var DataView = arrayBuffer.DataView;
	var NATIVE_ARRAY_BUFFER_VIEWS = arrayBufferViewCore.NATIVE_ARRAY_BUFFER_VIEWS;
	var TYPED_ARRAY_TAG = arrayBufferViewCore.TYPED_ARRAY_TAG;
	var TypedArray = arrayBufferViewCore.TypedArray;
	var TypedArrayPrototype = arrayBufferViewCore.TypedArrayPrototype;
	var aTypedArrayConstructor = arrayBufferViewCore.aTypedArrayConstructor;
	var isTypedArray = arrayBufferViewCore.isTypedArray;
	var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
	var WRONG_LENGTH = 'Wrong length';

	var fromList = function (C, list) {
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor(C))(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	};

	var addGetter = function (it, key) {
	  nativeDefineProperty(it, key, { get: function () {
	    return getInternalState(this)[key];
	  } });
	};

	var isArrayBuffer = function (it) {
	  var klass;
	  return it instanceof ArrayBuffer || (klass = classof(it)) == 'ArrayBuffer' || klass == 'SharedArrayBuffer';
	};

	var isTypedArrayIndex = function (target, key) {
	  return isTypedArray(target)
	    && typeof key != 'symbol'
	    && key in target
	    && String(+key) == String(key);
	};

	var wrappedGetOwnPropertyDescriptor = function getOwnPropertyDescriptor(target, key) {
	  return isTypedArrayIndex(target, key = toPrimitive(key, true))
	    ? createPropertyDescriptor(2, target[key])
	    : nativeGetOwnPropertyDescriptor(target, key);
	};

	var wrappedDefineProperty = function defineProperty(target, key, descriptor) {
	  if (isTypedArrayIndex(target, key = toPrimitive(key, true))
	    && isObject(descriptor)
	    && has(descriptor, 'value')
	    && !has(descriptor, 'get')
	    && !has(descriptor, 'set')
	    // TODO: add validation descriptor w/o calling accessors
	    && !descriptor.configurable
	    && (!has(descriptor, 'writable') || descriptor.writable)
	    && (!has(descriptor, 'enumerable') || descriptor.enumerable)
	  ) {
	    target[key] = descriptor.value;
	    return target;
	  } return nativeDefineProperty(target, key, descriptor);
	};

	if (descriptors) {
	  if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	    objectGetOwnPropertyDescriptor.f = wrappedGetOwnPropertyDescriptor;
	    objectDefineProperty.f = wrappedDefineProperty;
	    addGetter(TypedArrayPrototype, 'buffer');
	    addGetter(TypedArrayPrototype, 'byteOffset');
	    addGetter(TypedArrayPrototype, 'byteLength');
	    addGetter(TypedArrayPrototype, 'length');
	  }

	  _export({ target: 'Object', stat: true, forced: !NATIVE_ARRAY_BUFFER_VIEWS }, {
	    getOwnPropertyDescriptor: wrappedGetOwnPropertyDescriptor,
	    defineProperty: wrappedDefineProperty
	  });

	  module.exports = function (TYPE, wrapper, CLAMPED) {
	    var BYTES = TYPE.match(/\d+$/)[0] / 8;
	    var CONSTRUCTOR_NAME = TYPE + (CLAMPED ? 'Clamped' : '') + 'Array';
	    var GETTER = 'get' + TYPE;
	    var SETTER = 'set' + TYPE;
	    var NativeTypedArrayConstructor = global_1[CONSTRUCTOR_NAME];
	    var TypedArrayConstructor = NativeTypedArrayConstructor;
	    var TypedArrayConstructorPrototype = TypedArrayConstructor && TypedArrayConstructor.prototype;
	    var exported = {};

	    var getter = function (that, index) {
	      var data = getInternalState(that);
	      return data.view[GETTER](index * BYTES + data.byteOffset, true);
	    };

	    var setter = function (that, index, value) {
	      var data = getInternalState(that);
	      if (CLAMPED) value = (value = round(value)) < 0 ? 0 : value > 0xFF ? 0xFF : value & 0xFF;
	      data.view[SETTER](index * BYTES + data.byteOffset, value, true);
	    };

	    var addElement = function (that, index) {
	      nativeDefineProperty(that, index, {
	        get: function () {
	          return getter(this, index);
	        },
	        set: function (value) {
	          return setter(this, index, value);
	        },
	        enumerable: true
	      });
	    };

	    if (!NATIVE_ARRAY_BUFFER_VIEWS) {
	      TypedArrayConstructor = wrapper(function (that, data, offset, $length) {
	        anInstance(that, TypedArrayConstructor, CONSTRUCTOR_NAME);
	        var index = 0;
	        var byteOffset = 0;
	        var buffer, byteLength, length;
	        if (!isObject(data)) {
	          length = toIndex(data);
	          byteLength = length * BYTES;
	          buffer = new ArrayBuffer(byteLength);
	        } else if (isArrayBuffer(data)) {
	          buffer = data;
	          byteOffset = toOffset(offset, BYTES);
	          var $len = data.byteLength;
	          if ($length === undefined) {
	            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
	            byteLength = $len - byteOffset;
	            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
	          } else {
	            byteLength = toLength($length) * BYTES;
	            if (byteLength + byteOffset > $len) throw RangeError(WRONG_LENGTH);
	          }
	          length = byteLength / BYTES;
	        } else if (isTypedArray(data)) {
	          return fromList(TypedArrayConstructor, data);
	        } else {
	          return typedArrayFrom.call(TypedArrayConstructor, data);
	        }
	        setInternalState(that, {
	          buffer: buffer,
	          byteOffset: byteOffset,
	          byteLength: byteLength,
	          length: length,
	          view: new DataView(buffer)
	        });
	        while (index < length) addElement(that, index++);
	      });

	      if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
	      TypedArrayConstructorPrototype = TypedArrayConstructor.prototype = objectCreate(TypedArrayPrototype);
	    } else if (typedArraysConstructorsRequiresWrappers) {
	      TypedArrayConstructor = wrapper(function (dummy, data, typedArrayOffset, $length) {
	        anInstance(dummy, TypedArrayConstructor, CONSTRUCTOR_NAME);
	        return inheritIfRequired(function () {
	          if (!isObject(data)) return new NativeTypedArrayConstructor(toIndex(data));
	          if (isArrayBuffer(data)) return $length !== undefined
	            ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES), $length)
	            : typedArrayOffset !== undefined
	              ? new NativeTypedArrayConstructor(data, toOffset(typedArrayOffset, BYTES))
	              : new NativeTypedArrayConstructor(data);
	          if (isTypedArray(data)) return fromList(TypedArrayConstructor, data);
	          return typedArrayFrom.call(TypedArrayConstructor, data);
	        }(), dummy, TypedArrayConstructor);
	      });

	      if (objectSetPrototypeOf) objectSetPrototypeOf(TypedArrayConstructor, TypedArray);
	      forEach(getOwnPropertyNames(NativeTypedArrayConstructor), function (key) {
	        if (!(key in TypedArrayConstructor)) {
	          createNonEnumerableProperty(TypedArrayConstructor, key, NativeTypedArrayConstructor[key]);
	        }
	      });
	      TypedArrayConstructor.prototype = TypedArrayConstructorPrototype;
	    }

	    if (TypedArrayConstructorPrototype.constructor !== TypedArrayConstructor) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, 'constructor', TypedArrayConstructor);
	    }

	    if (TYPED_ARRAY_TAG) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, TYPED_ARRAY_TAG, CONSTRUCTOR_NAME);
	    }

	    exported[CONSTRUCTOR_NAME] = TypedArrayConstructor;

	    _export({
	      global: true, forced: TypedArrayConstructor != NativeTypedArrayConstructor, sham: !NATIVE_ARRAY_BUFFER_VIEWS
	    }, exported);

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructor)) {
	      createNonEnumerableProperty(TypedArrayConstructor, BYTES_PER_ELEMENT, BYTES);
	    }

	    if (!(BYTES_PER_ELEMENT in TypedArrayConstructorPrototype)) {
	      createNonEnumerableProperty(TypedArrayConstructorPrototype, BYTES_PER_ELEMENT, BYTES);
	    }

	    setSpecies(CONSTRUCTOR_NAME);
	  };
	} else module.exports = function () { /* empty */ };
	});

	// `Uint8Array` constructor
	// https://tc39.github.io/ecma262/#sec-typedarray-objects
	typedArrayConstructor('Uint8', function (init) {
	  return function Uint8Array(data, byteOffset, length) {
	    return init(this, data, byteOffset, length);
	  };
	});

	var min$4 = Math.min;

	// `Array.prototype.copyWithin` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.copywithin
	var arrayCopyWithin = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
	  var O = toObject(this);
	  var len = toLength(O.length);
	  var to = toAbsoluteIndex(target, len);
	  var from = toAbsoluteIndex(start, len);
	  var end = arguments.length > 2 ? arguments[2] : undefined;
	  var count = min$4((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
	  var inc = 1;
	  if (from < to && to < from + count) {
	    inc = -1;
	    from += count - 1;
	    to += count - 1;
	  }
	  while (count-- > 0) {
	    if (from in O) O[to] = O[from];
	    else delete O[to];
	    to += inc;
	    from += inc;
	  } return O;
	};

	var aTypedArray$1 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$1 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.copyWithin` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.copywithin
	exportTypedArrayMethod$1('copyWithin', function copyWithin(target, start /* , end */) {
	  return arrayCopyWithin.call(aTypedArray$1(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
	});

	var $every = arrayIteration.every;

	var aTypedArray$2 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$2 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.every` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.every
	exportTypedArrayMethod$2('every', function every(callbackfn /* , thisArg */) {
	  return $every(aTypedArray$2(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$3 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$3 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.fill` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.fill
	// eslint-disable-next-line no-unused-vars
	exportTypedArrayMethod$3('fill', function fill(value /* , start, end */) {
	  return arrayFill.apply(aTypedArray$3(this), arguments);
	});

	var $filter$1 = arrayIteration.filter;


	var aTypedArray$4 = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$2 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$4 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.filter` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.filter
	exportTypedArrayMethod$4('filter', function filter(callbackfn /* , thisArg */) {
	  var list = $filter$1(aTypedArray$4(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	  var C = speciesConstructor(this, this.constructor);
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor$2(C))(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	});

	var $find = arrayIteration.find;

	var aTypedArray$5 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$5 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.find` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.find
	exportTypedArrayMethod$5('find', function find(predicate /* , thisArg */) {
	  return $find(aTypedArray$5(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $findIndex = arrayIteration.findIndex;

	var aTypedArray$6 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$6 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.findIndex` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.findindex
	exportTypedArrayMethod$6('findIndex', function findIndex(predicate /* , thisArg */) {
	  return $findIndex(aTypedArray$6(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $forEach = arrayIteration.forEach;

	var aTypedArray$7 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$7 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.forEach` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.foreach
	exportTypedArrayMethod$7('forEach', function forEach(callbackfn /* , thisArg */) {
	  $forEach(aTypedArray$7(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $includes = arrayIncludes.includes;

	var aTypedArray$8 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$8 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.includes
	exportTypedArrayMethod$8('includes', function includes(searchElement /* , fromIndex */) {
	  return $includes(aTypedArray$8(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $indexOf = arrayIncludes.indexOf;

	var aTypedArray$9 = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$9 = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.indexOf` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.indexof
	exportTypedArrayMethod$9('indexOf', function indexOf(searchElement /* , fromIndex */) {
	  return $indexOf(aTypedArray$9(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
	});

	var ITERATOR$6 = wellKnownSymbol('iterator');
	var Uint8Array$1 = global_1.Uint8Array;
	var arrayValues = es_array_iterator.values;
	var arrayKeys = es_array_iterator.keys;
	var arrayEntries = es_array_iterator.entries;
	var aTypedArray$a = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$a = arrayBufferViewCore.exportTypedArrayMethod;
	var nativeTypedArrayIterator = Uint8Array$1 && Uint8Array$1.prototype[ITERATOR$6];

	var CORRECT_ITER_NAME = !!nativeTypedArrayIterator
	  && (nativeTypedArrayIterator.name == 'values' || nativeTypedArrayIterator.name == undefined);

	var typedArrayValues = function values() {
	  return arrayValues.call(aTypedArray$a(this));
	};

	// `%TypedArray%.prototype.entries` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.entries
	exportTypedArrayMethod$a('entries', function entries() {
	  return arrayEntries.call(aTypedArray$a(this));
	});
	// `%TypedArray%.prototype.keys` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.keys
	exportTypedArrayMethod$a('keys', function keys() {
	  return arrayKeys.call(aTypedArray$a(this));
	});
	// `%TypedArray%.prototype.values` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.values
	exportTypedArrayMethod$a('values', typedArrayValues, !CORRECT_ITER_NAME);
	// `%TypedArray%.prototype[@@iterator]` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype-@@iterator
	exportTypedArrayMethod$a(ITERATOR$6, typedArrayValues, !CORRECT_ITER_NAME);

	var aTypedArray$b = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$b = arrayBufferViewCore.exportTypedArrayMethod;
	var $join = [].join;

	// `%TypedArray%.prototype.join` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.join
	// eslint-disable-next-line no-unused-vars
	exportTypedArrayMethod$b('join', function join(separator) {
	  return $join.apply(aTypedArray$b(this), arguments);
	});

	var sloppyArrayMethod = function (METHOD_NAME, argument) {
	  var method = [][METHOD_NAME];
	  return !method || !fails(function () {
	    // eslint-disable-next-line no-useless-call,no-throw-literal
	    method.call(null, argument || function () { throw 1; }, 1);
	  });
	};

	var min$5 = Math.min;
	var nativeLastIndexOf = [].lastIndexOf;
	var NEGATIVE_ZERO = !!nativeLastIndexOf && 1 / [1].lastIndexOf(1, -0) < 0;
	var SLOPPY_METHOD = sloppyArrayMethod('lastIndexOf');

	// `Array.prototype.lastIndexOf` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.lastindexof
	var arrayLastIndexOf = (NEGATIVE_ZERO || SLOPPY_METHOD) ? function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
	  // convert -0 to +0
	  if (NEGATIVE_ZERO) return nativeLastIndexOf.apply(this, arguments) || 0;
	  var O = toIndexedObject(this);
	  var length = toLength(O.length);
	  var index = length - 1;
	  if (arguments.length > 1) index = min$5(index, toInteger(arguments[1]));
	  if (index < 0) index = length + index;
	  for (;index >= 0; index--) if (index in O && O[index] === searchElement) return index || 0;
	  return -1;
	} : nativeLastIndexOf;

	var aTypedArray$c = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$c = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.lastIndexOf` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.lastindexof
	// eslint-disable-next-line no-unused-vars
	exportTypedArrayMethod$c('lastIndexOf', function lastIndexOf(searchElement /* , fromIndex */) {
	  return arrayLastIndexOf.apply(aTypedArray$c(this), arguments);
	});

	var $map = arrayIteration.map;


	var aTypedArray$d = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$3 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$d = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.map` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.map
	exportTypedArrayMethod$d('map', function map(mapfn /* , thisArg */) {
	  return $map(aTypedArray$d(this), mapfn, arguments.length > 1 ? arguments[1] : undefined, function (O, length) {
	    return new (aTypedArrayConstructor$3(speciesConstructor(O, O.constructor)))(length);
	  });
	});

	// `Array.prototype.{ reduce, reduceRight }` methods implementation
	var createMethod$4 = function (IS_RIGHT) {
	  return function (that, callbackfn, argumentsLength, memo) {
	    aFunction$1(callbackfn);
	    var O = toObject(that);
	    var self = indexedObject(O);
	    var length = toLength(O.length);
	    var index = IS_RIGHT ? length - 1 : 0;
	    var i = IS_RIGHT ? -1 : 1;
	    if (argumentsLength < 2) while (true) {
	      if (index in self) {
	        memo = self[index];
	        index += i;
	        break;
	      }
	      index += i;
	      if (IS_RIGHT ? index < 0 : length <= index) {
	        throw TypeError('Reduce of empty array with no initial value');
	      }
	    }
	    for (;IS_RIGHT ? index >= 0 : length > index; index += i) if (index in self) {
	      memo = callbackfn(memo, self[index], index, O);
	    }
	    return memo;
	  };
	};

	var arrayReduce = {
	  // `Array.prototype.reduce` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduce
	  left: createMethod$4(false),
	  // `Array.prototype.reduceRight` method
	  // https://tc39.github.io/ecma262/#sec-array.prototype.reduceright
	  right: createMethod$4(true)
	};

	var $reduce = arrayReduce.left;

	var aTypedArray$e = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$e = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.reduce` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduce
	exportTypedArrayMethod$e('reduce', function reduce(callbackfn /* , initialValue */) {
	  return $reduce(aTypedArray$e(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	});

	var $reduceRight = arrayReduce.right;

	var aTypedArray$f = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$f = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.reduceRicht` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reduceright
	exportTypedArrayMethod$f('reduceRight', function reduceRight(callbackfn /* , initialValue */) {
	  return $reduceRight(aTypedArray$f(this), callbackfn, arguments.length, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$g = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$g = arrayBufferViewCore.exportTypedArrayMethod;
	var floor$3 = Math.floor;

	// `%TypedArray%.prototype.reverse` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.reverse
	exportTypedArrayMethod$g('reverse', function reverse() {
	  var that = this;
	  var length = aTypedArray$g(that).length;
	  var middle = floor$3(length / 2);
	  var index = 0;
	  var value;
	  while (index < middle) {
	    value = that[index];
	    that[index++] = that[--length];
	    that[length] = value;
	  } return that;
	});

	var aTypedArray$h = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$h = arrayBufferViewCore.exportTypedArrayMethod;

	var FORCED$2 = fails(function () {
	  // eslint-disable-next-line no-undef
	  new Int8Array(1).set({});
	});

	// `%TypedArray%.prototype.set` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.set
	exportTypedArrayMethod$h('set', function set(arrayLike /* , offset */) {
	  aTypedArray$h(this);
	  var offset = toOffset(arguments.length > 1 ? arguments[1] : undefined, 1);
	  var length = this.length;
	  var src = toObject(arrayLike);
	  var len = toLength(src.length);
	  var index = 0;
	  if (len + offset > length) throw RangeError('Wrong length');
	  while (index < len) this[offset + index] = src[index++];
	}, FORCED$2);

	var aTypedArray$i = arrayBufferViewCore.aTypedArray;
	var aTypedArrayConstructor$4 = arrayBufferViewCore.aTypedArrayConstructor;
	var exportTypedArrayMethod$i = arrayBufferViewCore.exportTypedArrayMethod;
	var $slice = [].slice;

	var FORCED$3 = fails(function () {
	  // eslint-disable-next-line no-undef
	  new Int8Array(1).slice();
	});

	// `%TypedArray%.prototype.slice` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.slice
	exportTypedArrayMethod$i('slice', function slice(start, end) {
	  var list = $slice.call(aTypedArray$i(this), start, end);
	  var C = speciesConstructor(this, this.constructor);
	  var index = 0;
	  var length = list.length;
	  var result = new (aTypedArrayConstructor$4(C))(length);
	  while (length > index) result[index] = list[index++];
	  return result;
	}, FORCED$3);

	var $some = arrayIteration.some;

	var aTypedArray$j = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$j = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.some` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.some
	exportTypedArrayMethod$j('some', function some(callbackfn /* , thisArg */) {
	  return $some(aTypedArray$j(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	});

	var aTypedArray$k = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$k = arrayBufferViewCore.exportTypedArrayMethod;
	var $sort = [].sort;

	// `%TypedArray%.prototype.sort` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.sort
	exportTypedArrayMethod$k('sort', function sort(comparefn) {
	  return $sort.call(aTypedArray$k(this), comparefn);
	});

	var aTypedArray$l = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$l = arrayBufferViewCore.exportTypedArrayMethod;

	// `%TypedArray%.prototype.subarray` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.subarray
	exportTypedArrayMethod$l('subarray', function subarray(begin, end) {
	  var O = aTypedArray$l(this);
	  var length = O.length;
	  var beginIndex = toAbsoluteIndex(begin, length);
	  return new (speciesConstructor(O, O.constructor))(
	    O.buffer,
	    O.byteOffset + beginIndex * O.BYTES_PER_ELEMENT,
	    toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - beginIndex)
	  );
	});

	var Int8Array$3 = global_1.Int8Array;
	var aTypedArray$m = arrayBufferViewCore.aTypedArray;
	var exportTypedArrayMethod$m = arrayBufferViewCore.exportTypedArrayMethod;
	var $toLocaleString = [].toLocaleString;
	var $slice$1 = [].slice;

	// iOS Safari 6.x fails here
	var TO_LOCALE_STRING_BUG = !!Int8Array$3 && fails(function () {
	  $toLocaleString.call(new Int8Array$3(1));
	});

	var FORCED$4 = fails(function () {
	  return [1, 2].toLocaleString() != new Int8Array$3([1, 2]).toLocaleString();
	}) || !fails(function () {
	  Int8Array$3.prototype.toLocaleString.call([1, 2]);
	});

	// `%TypedArray%.prototype.toLocaleString` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tolocalestring
	exportTypedArrayMethod$m('toLocaleString', function toLocaleString() {
	  return $toLocaleString.apply(TO_LOCALE_STRING_BUG ? $slice$1.call(aTypedArray$m(this)) : aTypedArray$m(this), arguments);
	}, FORCED$4);

	var exportTypedArrayMethod$n = arrayBufferViewCore.exportTypedArrayMethod;



	var Uint8Array$2 = global_1.Uint8Array;
	var Uint8ArrayPrototype = Uint8Array$2 && Uint8Array$2.prototype || {};
	var arrayToString = [].toString;
	var arrayJoin = [].join;

	if (fails(function () { arrayToString.call({}); })) {
	  arrayToString = function toString() {
	    return arrayJoin.call(this);
	  };
	}

	var IS_NOT_ARRAY_METHOD = Uint8ArrayPrototype.toString != arrayToString;

	// `%TypedArray%.prototype.toString` method
	// https://tc39.github.io/ecma262/#sec-%typedarray%.prototype.tostring
	exportTypedArrayMethod$n('toString', arrayToString, IS_NOT_ARRAY_METHOD);

	var $forEach$1 = arrayIteration.forEach;


	// `Array.prototype.forEach` method implementation
	// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
	var arrayForEach = sloppyArrayMethod('forEach') ? function forEach(callbackfn /* , thisArg */) {
	  return $forEach$1(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
	} : [].forEach;

	for (var COLLECTION_NAME$1 in domIterables) {
	  var Collection$1 = global_1[COLLECTION_NAME$1];
	  var CollectionPrototype$1 = Collection$1 && Collection$1.prototype;
	  // some Chrome versions have non-configurable methods on DOMTokenList
	  if (CollectionPrototype$1 && CollectionPrototype$1.forEach !== arrayForEach) try {
	    createNonEnumerableProperty(CollectionPrototype$1, 'forEach', arrayForEach);
	  } catch (error) {
	    CollectionPrototype$1.forEach = arrayForEach;
	  }
	}

	// `URL.prototype.toJSON` method
	// https://url.spec.whatwg.org/#dom-url-tojson
	_export({ target: 'URL', proto: true, enumerable: true }, {
	  toJSON: function toJSON() {
	    return URL.prototype.toString.call(this);
	  }
	});

	/**
	 * Types of traffic.
	 * @enum {string}
	 */
	var ThetaTrafficType = {
	  /** Data being sent from peer. */
	  P2P_INBOUND: 'p2p_inbound',

	  /** Data being sent to peer. */
	  P2P_OUTBOUND: 'p2p_outbound',

	  /** Data being sent from CDN */
	  CDN: 'cdn'
	};
	var ThetaEvents = {
	  // fired when number of peers changed - data: { totalPeers : Integer }
	  PEERS_CHANGED: 'thetaPeersChanged',
	  // fired when current peer ID has changed - data: { peerID : string }
	  PEER_ID_CHANGED: 'thetaPeerIDChanged',
	  // fired when traffic is sent/received - data: { type : ThetaTrafficType, stats : { length : integer }, peer : { id : string, address : string } }
	  TRAFFIC: 'thetaTraffic',
	  // fired when an account is updated - data: { account : Object }
	  ACCOUNT_UPDATED: 'thetaAccountUpdated',
	  // fired when a payment is sent - data: { payment : Object }
	  PAYMENT_SENT: 'thetaPaymentSent',
	  // fired when a payment is received - data: { payment : Object }
	  PAYMENT_RECEIVED: 'thetaPaymentReceived',
	  // fired when a received payments are submitted - data: { payment : Object }
	  SUBMITTED_RECEIVED_PAYMENTS: 'thetaSubmittedReceivedPayments'
	};
	var parcelRequire
	var peerjs_min = createCommonjsModule(function (module, exports) {
	parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof commonjsRequire&&commonjsRequire;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this);}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={};},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t;},{}];};for(var c=0;c<t.length;c++)try{f(t[c]);}catch(e){i||(i=e);}if(t.length){var l=f(t[t.length-1]);module.exports=l;}if(parcelRequire=f,i)throw i;return f}({"vHo1":[function(require,module,exports) {
	var e={};e.useBlobBuilder=function(){try{return new Blob([]),!1}catch(e){return !0}}(),e.useArrayBufferView=!e.useBlobBuilder&&function(){try{return 0===new Blob([new Uint8Array([])]).size}catch(e){return !0}}(),module.exports.binaryFeatures=e;var r=module.exports.BlobBuilder;function t(){this._pieces=[],this._parts=[];}"undefined"!=typeof window&&(r=module.exports.BlobBuilder=window.WebKitBlobBuilder||window.MozBlobBuilder||window.MSBlobBuilder||window.BlobBuilder),t.prototype.append=function(e){"number"==typeof e?this._pieces.push(e):(this.flush(),this._parts.push(e));},t.prototype.flush=function(){if(this._pieces.length>0){var r=new Uint8Array(this._pieces);e.useArrayBufferView||(r=r.buffer),this._parts.push(r),this._pieces=[];}},t.prototype.getBuffer=function(){if(this.flush(),e.useBlobBuilder){for(var t=new r,i=0,u=this._parts.length;i<u;i++)t.append(this._parts[i]);return t.getBlob()}return new Blob(this._parts)},module.exports.BufferBuilder=t;
	},{}],"lHOc":[function(require,module,exports) {
	var t=require("./bufferbuilder").BufferBuilder,e=require("./bufferbuilder").binaryFeatures,i={unpack:function(t){return new r(t).unpack()},pack:function(t){var e=new n;return e.pack(t),e.getBuffer()}};function r(t){this.index=0,this.dataBuffer=t,this.dataView=new Uint8Array(this.dataBuffer),this.length=this.dataBuffer.byteLength;}function n(){this.bufferBuilder=new t;}function u(t){var e=t.charCodeAt(0);return e<=2047?"00":e<=65535?"000":e<=2097151?"0000":e<=67108863?"00000":"000000"}function a(t){return t.length>600?new Blob([t]).size:t.replace(/[^\u0000-\u007F]/g,u).length}module.exports=i,r.prototype.unpack=function(){var t,e=this.unpack_uint8();if(e<128)return e;if((224^e)<32)return (224^e)-32;if((t=160^e)<=15)return this.unpack_raw(t);if((t=176^e)<=15)return this.unpack_string(t);if((t=144^e)<=15)return this.unpack_array(t);if((t=128^e)<=15)return this.unpack_map(t);switch(e){case 192:return null;case 193:return;case 194:return !1;case 195:return !0;case 202:return this.unpack_float();case 203:return this.unpack_double();case 204:return this.unpack_uint8();case 205:return this.unpack_uint16();case 206:return this.unpack_uint32();case 207:return this.unpack_uint64();case 208:return this.unpack_int8();case 209:return this.unpack_int16();case 210:return this.unpack_int32();case 211:return this.unpack_int64();case 212:case 213:case 214:case 215:return;case 216:return t=this.unpack_uint16(),this.unpack_string(t);case 217:return t=this.unpack_uint32(),this.unpack_string(t);case 218:return t=this.unpack_uint16(),this.unpack_raw(t);case 219:return t=this.unpack_uint32(),this.unpack_raw(t);case 220:return t=this.unpack_uint16(),this.unpack_array(t);case 221:return t=this.unpack_uint32(),this.unpack_array(t);case 222:return t=this.unpack_uint16(),this.unpack_map(t);case 223:return t=this.unpack_uint32(),this.unpack_map(t)}},r.prototype.unpack_uint8=function(){var t=255&this.dataView[this.index];return this.index++,t},r.prototype.unpack_uint16=function(){var t=this.read(2),e=256*(255&t[0])+(255&t[1]);return this.index+=2,e},r.prototype.unpack_uint32=function(){var t=this.read(4),e=256*(256*(256*t[0]+t[1])+t[2])+t[3];return this.index+=4,e},r.prototype.unpack_uint64=function(){var t=this.read(8),e=256*(256*(256*(256*(256*(256*(256*t[0]+t[1])+t[2])+t[3])+t[4])+t[5])+t[6])+t[7];return this.index+=8,e},r.prototype.unpack_int8=function(){var t=this.unpack_uint8();return t<128?t:t-256},r.prototype.unpack_int16=function(){var t=this.unpack_uint16();return t<32768?t:t-65536},r.prototype.unpack_int32=function(){var t=this.unpack_uint32();return t<Math.pow(2,31)?t:t-Math.pow(2,32)},r.prototype.unpack_int64=function(){var t=this.unpack_uint64();return t<Math.pow(2,63)?t:t-Math.pow(2,64)},r.prototype.unpack_raw=function(t){if(this.length<this.index+t)throw new Error("BinaryPackFailure: index is out of range "+this.index+" "+t+" "+this.length);var e=this.dataBuffer.slice(this.index,this.index+t);return this.index+=t,e},r.prototype.unpack_string=function(t){for(var e,i,r=this.read(t),n=0,u="";n<t;)(e=r[n])<128?(u+=String.fromCharCode(e),n++):(192^e)<32?(i=(192^e)<<6|63&r[n+1],u+=String.fromCharCode(i),n+=2):(i=(15&e)<<12|(63&r[n+1])<<6|63&r[n+2],u+=String.fromCharCode(i),n+=3);return this.index+=t,u},r.prototype.unpack_array=function(t){for(var e=new Array(t),i=0;i<t;i++)e[i]=this.unpack();return e},r.prototype.unpack_map=function(t){for(var e={},i=0;i<t;i++){var r=this.unpack(),n=this.unpack();e[r]=n;}return e},r.prototype.unpack_float=function(){var t=this.unpack_uint32(),e=(t>>23&255)-127;return (0==t>>31?1:-1)*(8388607&t|8388608)*Math.pow(2,e-23)},r.prototype.unpack_double=function(){var t=this.unpack_uint32(),e=this.unpack_uint32(),i=(t>>20&2047)-1023;return (0==t>>31?1:-1)*((1048575&t|1048576)*Math.pow(2,i-20)+e*Math.pow(2,i-52))},r.prototype.read=function(t){var e=this.index;if(e+t<=this.length)return this.dataView.subarray(e,e+t);throw new Error("BinaryPackFailure: read index out of range")},n.prototype.getBuffer=function(){return this.bufferBuilder.getBuffer()},n.prototype.pack=function(t){var i=typeof t;if("string"==i)this.pack_string(t);else if("number"==i)Math.floor(t)===t?this.pack_integer(t):this.pack_double(t);else if("boolean"==i)!0===t?this.bufferBuilder.append(195):!1===t&&this.bufferBuilder.append(194);else if("undefined"==i)this.bufferBuilder.append(192);else{if("object"!=i)throw new Error('Type "'+i+'" not yet supported');if(null===t)this.bufferBuilder.append(192);else{var r=t.constructor;if(r==Array)this.pack_array(t);else if(r==Blob||r==File)this.pack_bin(t);else if(r==ArrayBuffer)e.useArrayBufferView?this.pack_bin(new Uint8Array(t)):this.pack_bin(t);else if("BYTES_PER_ELEMENT"in t)e.useArrayBufferView?this.pack_bin(new Uint8Array(t.buffer)):this.pack_bin(t.buffer);else if(r==Object)this.pack_object(t);else if(r==Date)this.pack_string(t.toString());else{if("function"!=typeof t.toBinaryPack)throw new Error('Type "'+r.toString()+'" not yet supported');this.bufferBuilder.append(t.toBinaryPack());}}}this.bufferBuilder.flush();},n.prototype.pack_bin=function(t){var e=t.length||t.byteLength||t.size;if(e<=15)this.pack_uint8(160+e);else if(e<=65535)this.bufferBuilder.append(218),this.pack_uint16(e);else{if(!(e<=4294967295))throw new Error("Invalid length");this.bufferBuilder.append(219),this.pack_uint32(e);}this.bufferBuilder.append(t);},n.prototype.pack_string=function(t){var e=a(t);if(e<=15)this.pack_uint8(176+e);else if(e<=65535)this.bufferBuilder.append(216),this.pack_uint16(e);else{if(!(e<=4294967295))throw new Error("Invalid length");this.bufferBuilder.append(217),this.pack_uint32(e);}this.bufferBuilder.append(t);},n.prototype.pack_array=function(t){var e=t.length;if(e<=15)this.pack_uint8(144+e);else if(e<=65535)this.bufferBuilder.append(220),this.pack_uint16(e);else{if(!(e<=4294967295))throw new Error("Invalid length");this.bufferBuilder.append(221),this.pack_uint32(e);}for(var i=0;i<e;i++)this.pack(t[i]);},n.prototype.pack_integer=function(t){if(-32<=t&&t<=127)this.bufferBuilder.append(255&t);else if(0<=t&&t<=255)this.bufferBuilder.append(204),this.pack_uint8(t);else if(-128<=t&&t<=127)this.bufferBuilder.append(208),this.pack_int8(t);else if(0<=t&&t<=65535)this.bufferBuilder.append(205),this.pack_uint16(t);else if(-32768<=t&&t<=32767)this.bufferBuilder.append(209),this.pack_int16(t);else if(0<=t&&t<=4294967295)this.bufferBuilder.append(206),this.pack_uint32(t);else if(-2147483648<=t&&t<=2147483647)this.bufferBuilder.append(210),this.pack_int32(t);else if(-0x8000000000000000<=t&&t<=0x8000000000000000)this.bufferBuilder.append(211),this.pack_int64(t);else{if(!(0<=t&&t<=0x10000000000000000))throw new Error("Invalid integer");this.bufferBuilder.append(207),this.pack_uint64(t);}},n.prototype.pack_double=function(t){var e=0;t<0&&(e=1,t=-t);var i=Math.floor(Math.log(t)/Math.LN2),r=t/Math.pow(2,i)-1,n=Math.floor(r*Math.pow(2,52)),u=Math.pow(2,32),a=e<<31|i+1023<<20|n/u&1048575,p=n%u;this.bufferBuilder.append(203),this.pack_int32(a),this.pack_int32(p);},n.prototype.pack_object=function(t){var e=Object.keys(t).length;if(e<=15)this.pack_uint8(128+e);else if(e<=65535)this.bufferBuilder.append(222),this.pack_uint16(e);else{if(!(e<=4294967295))throw new Error("Invalid length");this.bufferBuilder.append(223),this.pack_uint32(e);}for(var i in t)t.hasOwnProperty(i)&&(this.pack(i),this.pack(t[i]));},n.prototype.pack_uint8=function(t){this.bufferBuilder.append(t);},n.prototype.pack_uint16=function(t){this.bufferBuilder.append(t>>8),this.bufferBuilder.append(255&t);},n.prototype.pack_uint32=function(t){var e=4294967295&t;this.bufferBuilder.append((4278190080&e)>>>24),this.bufferBuilder.append((16711680&e)>>>16),this.bufferBuilder.append((65280&e)>>>8),this.bufferBuilder.append(255&e);},n.prototype.pack_uint64=function(t){var e=t/Math.pow(2,32),i=t%Math.pow(2,32);this.bufferBuilder.append((4278190080&e)>>>24),this.bufferBuilder.append((16711680&e)>>>16),this.bufferBuilder.append((65280&e)>>>8),this.bufferBuilder.append(255&e),this.bufferBuilder.append((4278190080&i)>>>24),this.bufferBuilder.append((16711680&i)>>>16),this.bufferBuilder.append((65280&i)>>>8),this.bufferBuilder.append(255&i);},n.prototype.pack_int8=function(t){this.bufferBuilder.append(255&t);},n.prototype.pack_int16=function(t){this.bufferBuilder.append((65280&t)>>8),this.bufferBuilder.append(255&t);},n.prototype.pack_int32=function(t){this.bufferBuilder.append(t>>>24&255),this.bufferBuilder.append((16711680&t)>>>16),this.bufferBuilder.append((65280&t)>>>8),this.bufferBuilder.append(255&t);},n.prototype.pack_int64=function(t){var e=Math.floor(t/Math.pow(2,32)),i=t%Math.pow(2,32);this.bufferBuilder.append((4278190080&e)>>>24),this.bufferBuilder.append((16711680&e)>>>16),this.bufferBuilder.append((65280&e)>>>8),this.bufferBuilder.append(255&e),this.bufferBuilder.append((4278190080&i)>>>24),this.bufferBuilder.append((16711680&i)>>>16),this.bufferBuilder.append((65280&i)>>>8),this.bufferBuilder.append(255&i);};
	},{"./bufferbuilder":"vHo1"}],"sXtV":[function(require,module,exports) {
	Object.defineProperty(exports,"__esModule",{value:!0}),exports.RTCSessionDescription=window.RTCSessionDescription||window.mozRTCSessionDescription,exports.RTCPeerConnection=window.RTCPeerConnection||window.mozRTCPeerConnection||window.webkitRTCPeerConnection,exports.RTCIceCandidate=window.RTCIceCandidate||window.mozRTCIceCandidate;
	},{}],"BHXf":[function(require,module,exports) {
	var n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var r in e)Object.hasOwnProperty.call(e,r)&&(n[r]=e[r]);return n.default=e,n};Object.defineProperty(exports,"__esModule",{value:!0});var r=n(require("js-binarypack")),t=require("./adapter"),a={iceServers:[{urls:"stun:stun.l.google.com:19302"}],sdpSemantics:"unified-plan"},o=function(){function e(){}var n;return e.noop=function(){},e.validateId=function(e){return !e||/^[A-Za-z0-9]+(?:[ _-][A-Za-z0-9]+)*$/.test(e)},e.chunk=function(n){for(var r,t=[],a=n.size,o=Math.ceil(a/e.chunkedMTU),i=r=0;i<a;){var u=Math.min(a,i+e.chunkedMTU),c=n.slice(i,u),d={__peerData:this._dataCount,n:r,data:c,total:o};t.push(d),i=u,r++;}return this._dataCount++,t},e.blobToArrayBuffer=function(e,n){var r=new FileReader;r.onload=function(e){n(e.target.result);},r.readAsArrayBuffer(e);},e.blobToBinaryString=function(e,n){var r=new FileReader;r.onload=function(e){n(e.target.result);},r.readAsBinaryString(e);},e.binaryStringToArrayBuffer=function(e){for(var n=new Uint8Array(e.length),r=0;r<e.length;r++)n[r]=255&e.charCodeAt(r);return n.buffer},e.randomToken=function(){return Math.random().toString(36).substr(2)},e.isSecure=function(){return "https:"===location.protocol},e.CLOUD_HOST="0.peerjs.com",e.CLOUD_PORT=443,e.chunkedBrowsers={Chrome:1},e.chunkedMTU=16300,e.defaultConfig=a,e.browser=(n=window).mozRTCPeerConnection?"Firefox":n.webkitRTCPeerConnection?"Chrome":n.RTCPeerConnection?"Supported":"Unsupported",e.supports=function(){if(void 0===t.RTCPeerConnection)return {};var e,n,r=!0,o=!0,i=!1,u=!1,c=!!window.webkitRTCPeerConnection;try{e=new t.RTCPeerConnection(a,{optional:[{RtpDataChannels:!0}]});}catch(l){r=!1,o=!1;}if(r)try{n=e.createDataChannel("_PEERJSTEST");}catch(l){r=!1;}if(r){try{n.binaryType="blob",i=!0;}catch(l){}var d=new t.RTCPeerConnection(a,{});try{u=d.createDataChannel("_PEERJSRELIABLETEST",{}).ordered;}catch(l){}d.close();}return o&&(o=!!e.addStream),e&&e.close(),{audioVideo:o,data:r,binaryBlob:i,binary:u,reliable:u,sctp:u,onnegotiationneeded:c}}(),e.pack=r.pack,e.unpack=r.unpack,e._dataCount=1,e}();exports.util=o;
	},{"js-binarypack":"lHOc","./adapter":"sXtV"}],"2JJl":[function(require,module,exports) {
	var e=Object.prototype.hasOwnProperty,t="~";function n(){}function r(e,t,n){this.fn=e,this.context=t,this.once=n||!1;}function o(e,n,o,s,i){if("function"!=typeof o)throw new TypeError("The listener must be a function");var c=new r(o,s||e,i),f=t?t+n:n;return e._events[f]?e._events[f].fn?e._events[f]=[e._events[f],c]:e._events[f].push(c):(e._events[f]=c,e._eventsCount++),e}function s(e,t){0==--e._eventsCount?e._events=new n:delete e._events[t];}function i(){this._events=new n,this._eventsCount=0;}Object.create&&(n.prototype=Object.create(null),(new n).__proto__||(t=!1)),i.prototype.eventNames=function(){var n,r,o=[];if(0===this._eventsCount)return o;for(r in n=this._events)e.call(n,r)&&o.push(t?r.slice(1):r);return Object.getOwnPropertySymbols?o.concat(Object.getOwnPropertySymbols(n)):o},i.prototype.listeners=function(e){var n=t?t+e:e,r=this._events[n];if(!r)return [];if(r.fn)return [r.fn];for(var o=0,s=r.length,i=new Array(s);o<s;o++)i[o]=r[o].fn;return i},i.prototype.listenerCount=function(e){var n=t?t+e:e,r=this._events[n];return r?r.fn?1:r.length:0},i.prototype.emit=function(e,n,r,o,s,i){var c=t?t+e:e;if(!this._events[c])return !1;var f,u,a=this._events[c],l=arguments.length;if(a.fn){switch(a.once&&this.removeListener(e,a.fn,void 0,!0),l){case 1:return a.fn.call(a.context),!0;case 2:return a.fn.call(a.context,n),!0;case 3:return a.fn.call(a.context,n,r),!0;case 4:return a.fn.call(a.context,n,r,o),!0;case 5:return a.fn.call(a.context,n,r,o,s),!0;case 6:return a.fn.call(a.context,n,r,o,s,i),!0}for(u=1,f=new Array(l-1);u<l;u++)f[u-1]=arguments[u];a.fn.apply(a.context,f);}else{var v,h=a.length;for(u=0;u<h;u++)switch(a[u].once&&this.removeListener(e,a[u].fn,void 0,!0),l){case 1:a[u].fn.call(a[u].context);break;case 2:a[u].fn.call(a[u].context,n);break;case 3:a[u].fn.call(a[u].context,n,r);break;case 4:a[u].fn.call(a[u].context,n,r,o);break;default:if(!f)for(v=1,f=new Array(l-1);v<l;v++)f[v-1]=arguments[v];a[u].fn.apply(a[u].context,f);}}return !0},i.prototype.on=function(e,t,n){return o(this,e,t,n,!1)},i.prototype.once=function(e,t,n){return o(this,e,t,n,!0)},i.prototype.removeListener=function(e,n,r,o){var i=t?t+e:e;if(!this._events[i])return this;if(!n)return s(this,i),this;var c=this._events[i];if(c.fn)c.fn!==n||o&&!c.once||r&&c.context!==r||s(this,i);else{for(var f=0,u=[],a=c.length;f<a;f++)(c[f].fn!==n||o&&!c[f].once||r&&c[f].context!==r)&&u.push(c[f]);u.length?this._events[i]=1===u.length?u[0]:u:s(this,i);}return this},i.prototype.removeAllListeners=function(e){var r;return e?(r=t?t+e:e,this._events[r]&&s(this,r)):(this._events=new n,this._eventsCount=0),this},i.prototype.off=i.prototype.removeListener,i.prototype.addListener=i.prototype.on,i.prefixed=t,i.EventEmitter=i,"undefined"!=typeof module&&(module.exports=i);
	},{}],"8WOs":[function(require,module,exports) {
	var r=this&&this.__read||function(r,e){var o="function"==typeof Symbol&&r[Symbol.iterator];if(!o)return r;var t,n,l=o.call(r),i=[];try{for(;(void 0===e||e-- >0)&&!(t=l.next()).done;)i.push(t.value);}catch(s){n={error:s};}finally{try{t&&!t.done&&(o=l.return)&&o.call(l);}finally{if(n)throw n.error}}return i},e=this&&this.__spread||function(){for(var e=[],o=0;o<arguments.length;o++)e=e.concat(r(arguments[o]));return e};Object.defineProperty(exports,"__esModule",{value:!0});var o,t="PeerJS: ";!function(r){r[r.Disabled=0]="Disabled",r[r.Errors=1]="Errors",r[r.Warnings=2]="Warnings",r[r.All=3]="All";}(o=exports.LogLevel||(exports.LogLevel={}));var n=function(){function r(){this._logLevel=o.Disabled;}return Object.defineProperty(r.prototype,"logLevel",{get:function(){return this._logLevel},set:function(r){this._logLevel=r;},enumerable:!0,configurable:!0}),r.prototype.log=function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];this._logLevel>=o.All&&this._print.apply(this,e([o.All],r));},r.prototype.warn=function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];this._logLevel>=o.Warnings&&this._print.apply(this,e([o.Warnings],r));},r.prototype.error=function(){for(var r=[],t=0;t<arguments.length;t++)r[t]=arguments[t];this._logLevel>=o.Errors&&this._print.apply(this,e([o.Errors],r));},r.prototype.setLogFunction=function(r){this._print=r;},r.prototype._print=function(r){for(var n=[],l=1;l<arguments.length;l++)n[l-1]=arguments[l];var i=e([t],n);for(var s in i)i[s]instanceof Error&&(i[s]="("+i[s].name+") "+i[s].message);r>=o.All?console.log.apply(console,e(i)):r>=o.Warnings?console.warn.apply(console,e(["WARNING"],i)):r>=o.Errors&&console.error.apply(console,e(["ERROR"],i));},r}();exports.default=new n;
	},{}],"9ZRY":[function(require,module,exports) {
	var e,r,n,o,t,a,i;Object.defineProperty(exports,"__esModule",{value:!0}),function(e){e.Open="open",e.Stream="stream",e.Data="data",e.Close="close",e.Error="error",e.IceStateChanged="iceStateChanged";}(e=exports.ConnectionEventType||(exports.ConnectionEventType={})),function(e){e.Data="data",e.Media="media";}(r=exports.ConnectionType||(exports.ConnectionType={})),function(e){e.Open="open",e.Close="close",e.Connection="connection",e.Call="call",e.Disconnected="disconnected",e.Error="error";}(n=exports.PeerEventType||(exports.PeerEventType={})),function(e){e.BrowserIncompatible="browser-incompatible",e.Disconnected="disconnected",e.InvalidID="invalid-id",e.InvalidKey="invalid-key",e.Network="network",e.PeerUnavailable="peer-unavailable",e.SslUnavailable="ssl-unavailable",e.ServerError="server-error",e.SocketError="socket-error",e.SocketClosed="socket-closed",e.UnavailableID="unavailable-id",e.WebRTC="webrtc";}(o=exports.PeerErrorType||(exports.PeerErrorType={})),function(e){e.Binary="binary",e.BinaryUTF8="binary-utf8",e.JSON="json";}(t=exports.SerializationType||(exports.SerializationType={})),function(e){e.Message="message",e.Disconnected="disconnected",e.Error="error",e.Close="close";}(a=exports.SocketEventType||(exports.SocketEventType={})),function(e){e.Heartbeat="HEARTBEAT",e.Candidate="CANDIDATE",e.Offer="OFFER",e.Answer="ANSWER",e.Open="OPEN",e.Error="ERROR",e.IdTaken="ID-TAKEN",e.InvalidKey="INVALID-KEY",e.Leave="LEAVE",e.Expire="EXPIRE";}(i=exports.ServerMessageType||(exports.ServerMessageType={}));
	},{}],"wJlv":[function(require,module,exports) {
	var e=this&&this.__extends||function(){var e=function(t,s){return (e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var s in t)t.hasOwnProperty(s)&&(e[s]=t[s]);})(t,s)};return function(t,s){function n(){this.constructor=t;}e(t,s),t.prototype=null===s?Object.create(s):(n.prototype=s.prototype,new n);}}(),t=this&&this.__read||function(e,t){var s="function"==typeof Symbol&&e[Symbol.iterator];if(!s)return e;var n,r,o=s.call(e),i=[];try{for(;(void 0===t||t-- >0)&&!(n=o.next()).done;)i.push(n.value);}catch(c){r={error:c};}finally{try{n&&!n.done&&(s=o.return)&&s.call(o);}finally{if(r)throw r.error}}return i},s=this&&this.__spread||function(){for(var e=[],s=0;s<arguments.length;s++)e=e.concat(t(arguments[s]));return e},n=this&&this.__values||function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],s=0;return t?t.call(e):{next:function(){return e&&s>=e.length&&(e=void 0),{value:e&&e[s++],done:!e}}}},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var o=require("eventemitter3"),i=r(require("./logger")),c=require("./enums"),a=function(t){function r(e,s,n,r,o,i){void 0===i&&(i=5e3);var c=t.call(this)||this;c.pingInterval=i,c._disconnected=!1,c._messagesQueue=[];var a=e?"wss://":"ws://";return c._wsUrl=a+s+":"+n+r+"peerjs?key="+o,c}return e(r,t),r.prototype.start=function(e,t){this._id=e,this._wsUrl+="&id="+e+"&token="+t,this._startWebSocket();},r.prototype._startWebSocket=function(){var e=this;this._socket||(this._socket=new WebSocket(this._wsUrl),this._socket.onmessage=function(t){var s;try{s=JSON.parse(t.data);}catch(n){return void i.default.log("Invalid server message",t.data)}e.emit(c.SocketEventType.Message,s);},this._socket.onclose=function(t){i.default.log("Socket closed.",t),e._disconnected=!0,clearTimeout(e._wsPingTimer),e.emit(c.SocketEventType.Disconnected);},this._socket.onopen=function(){e._disconnected||(e._sendQueuedMessages(),i.default.log("Socket open"),e._scheduleHeartbeat());});},r.prototype._scheduleHeartbeat=function(){var e=this;this._wsPingTimer=setTimeout(function(){e._sendHeartbeat();},this.pingInterval);},r.prototype._sendHeartbeat=function(){if(this._wsOpen()){var e=JSON.stringify({type:c.ServerMessageType.Heartbeat});this._socket.send(e),this._scheduleHeartbeat();}else i.default.log("Cannot send heartbeat, because socket closed");},r.prototype._wsOpen=function(){return !!this._socket&&1==this._socket.readyState},r.prototype._sendQueuedMessages=function(){var e,t,r=s(this._messagesQueue);this._messagesQueue=[];try{for(var o=n(r),i=o.next();!i.done;i=o.next()){var c=i.value;this.send(c);}}catch(a){e={error:a};}finally{try{i&&!i.done&&(t=o.return)&&t.call(o);}finally{if(e)throw e.error}}},r.prototype.send=function(e){if(!this._disconnected)if(this._id)if(e.type){if(this._wsOpen()){var t=JSON.stringify(e);this._socket.send(t);}}else this.emit(c.SocketEventType.Error,"Invalid message");else this._messagesQueue.push(e);},r.prototype.close=function(){!this._disconnected&&this._socket&&(this._socket.close(),this._disconnected=!0,clearTimeout(this._wsPingTimer));},r}(o.EventEmitter);exports.Socket=a;
	},{"eventemitter3":"2JJl","./logger":"8WOs","./enums":"9ZRY"}],"T9kO":[function(require,module,exports) {
	var r=require("js-binarypack"),t={debug:!1,inherits:function(e,r){e.super_=r,e.prototype=Object.create(r.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}});},extend:function(e,r){for(var t in r)r.hasOwnProperty(t)&&(e[t]=r[t]);return e},pack:r.pack,unpack:r.unpack,log:function(){if(t.debug){for(var e=[],r=0;r<arguments.length;r++)e[r]=arguments[r];e.unshift("Reliable: "),console.log.apply(console,e);}},setZeroTimeout:function(e){var r=[],t="zero-timeout-message";function n(n){n.source==e&&n.data==t&&(n.stopPropagation&&n.stopPropagation(),r.length&&r.shift()());}return e.addEventListener?e.addEventListener("message",n,!0):e.attachEvent&&e.attachEvent("onmessage",n),function(n){r.push(n),e.postMessage(t,"*");}}(this),blobToArrayBuffer:function(e,r){var t=new FileReader;t.onload=function(e){r(e.target.result);},t.readAsArrayBuffer(e);},blobToBinaryString:function(e,r){var t=new FileReader;t.onload=function(e){r(e.target.result);},t.readAsBinaryString(e);},binaryStringToArrayBuffer:function(e){for(var r=new Uint8Array(e.length),t=0;t<e.length;t++)r[t]=255&e.charCodeAt(t);return r.buffer},randomToken:function(){return Math.random().toString(36).substr(2)}};module.exports=t;
	},{"js-binarypack":"lHOc"}],"aYFJ":[function(require,module,exports) {
	var t=require("./util");function e(n,i){if(!(this instanceof e))return new e(n);this._dc=n,t.debug=i,this._outgoing={},this._incoming={},this._received={},this._window=1e3,this._mtu=500,this._interval=0,this._count=0,this._queue=[],this._setupDC();}e.prototype.send=function(e){var n=t.pack(e);n.size<this._mtu?this._handleSend(["no",n]):(this._outgoing[this._count]={ack:0,chunks:this._chunk(n)},t.debug&&(this._outgoing[this._count].timer=new Date),this._sendWindowedChunks(this._count),this._count+=1);},e.prototype._setupInterval=function(){var t=this;this._timeout=setInterval(function(){var e=t._queue.shift();if(e._multiple)for(var n=0,i=e.length;n<i;n+=1)t._intervalSend(e[n]);else t._intervalSend(e);},this._interval);},e.prototype._intervalSend=function(e){var n=this;e=t.pack(e),t.blobToBinaryString(e,function(t){n._dc.send(t);}),0===n._queue.length&&(clearTimeout(n._timeout),n._timeout=null);},e.prototype._processAcks=function(){for(var t in this._outgoing)this._outgoing.hasOwnProperty(t)&&this._sendWindowedChunks(t);},e.prototype._handleSend=function(t){for(var e=!0,n=0,i=this._queue.length;n<i;n+=1){var o=this._queue[n];o===t?e=!1:o._multiple&&-1!==o.indexOf(t)&&(e=!1);}e&&(this._queue.push(t),this._timeout||this._setupInterval());},e.prototype._setupDC=function(){var e=this;this._dc.onmessage=function(n){var i=n.data;if(i.constructor===String){var o=t.binaryStringToArrayBuffer(i);i=t.unpack(o),e._handleMessage(i);}};},e.prototype._handleMessage=function(e){var n,i=e[1],o=this._incoming[i],s=this._outgoing[i];switch(e[0]){case"no":var a=i;a&&this.onmessage(t.unpack(a));break;case"end":if(n=o,this._received[i]=e[2],!n)break;this._ack(i);break;case"ack":if(n=s){var h=e[2];n.ack=Math.max(h,n.ack),n.ack>=n.chunks.length?(t.log("Time: ",new Date-n.timer),delete this._outgoing[i]):this._processAcks();}break;case"chunk":if(!(n=o)){if(!0===this._received[i])break;n={ack:["ack",i,0],chunks:[]},this._incoming[i]=n;}var r=e[2],u=e[3];n.chunks[r]=new Uint8Array(u),r===n.ack[2]&&this._calculateNextAck(i),this._ack(i);break;default:this._handleSend(e);}},e.prototype._chunk=function(e){for(var n=[],i=e.size,o=0;o<i;){var s=Math.min(i,o+this._mtu),a={payload:e.slice(o,s)};n.push(a),o=s;}return t.log("Created",n.length,"chunks."),n},e.prototype._ack=function(t){var e=this._incoming[t].ack;this._received[t]===e[2]&&(this._complete(t),this._received[t]=!0),this._handleSend(e);},e.prototype._calculateNextAck=function(t){for(var e=this._incoming[t],n=e.chunks,i=0,o=n.length;i<o;i+=1)if(void 0===n[i])return void(e.ack[2]=i);e.ack[2]=n.length;},e.prototype._sendWindowedChunks=function(e){t.log("sendWindowedChunks for: ",e);for(var n=this._outgoing[e],i=n.chunks,o=[],s=Math.min(n.ack+this._window,i.length),a=n.ack;a<s;a+=1)i[a].sent&&a!==n.ack||(i[a].sent=!0,o.push(["chunk",e,a,i[a].payload]));n.ack+this._window>=i.length&&o.push(["end",e,i.length]),o._multiple=!0,this._handleSend(o);},e.prototype._complete=function(e){t.log("Completed called for",e);var n=this,i=this._incoming[e].chunks,o=new Blob(i);t.blobToArrayBuffer(o,function(e){n.onmessage(t.unpack(e));}),delete this._incoming[e];},e.higherBandwidthSDP=function(t){var e=navigator.appVersion.match(/Chrome\/(.*?) /);if(e&&(e=parseInt(e[1].split(".").shift()))<31){var n=t.split("b=AS:30");if(n.length>1)return n[0]+"b=AS:102400"+n[1]}return t},e.prototype.onmessage=function(t){},module.exports=e;
	},{"./util":"T9kO"}],"HCdX":[function(require,module,exports) {
	var e=this&&this.__assign||function(){return (e=Object.assign||function(e){for(var n,t=1,o=arguments.length;t<o;t++)for(var i in n=arguments[t])Object.prototype.hasOwnProperty.call(n,i)&&(e[i]=n[i]);return e}).apply(this,arguments)},n=this&&this.__awaiter||function(e,n,t,o){return new(t||(t=Promise))(function(i,r){function c(e){try{s(o.next(e));}catch(n){r(n);}}function a(e){try{s(o.throw(e));}catch(n){r(n);}}function s(e){e.done?i(e.value):new t(function(n){n(e.value);}).then(c,a);}s((o=o.apply(e,n||[])).next());})},t=this&&this.__generator||function(e,n){var t,o,i,r,c={label:0,sent:function(){if(1&i[0])throw i[1];return i[1]},trys:[],ops:[]};return r={next:a(0),throw:a(1),return:a(2)},"function"==typeof Symbol&&(r[Symbol.iterator]=function(){return this}),r;function a(r){return function(a){return function(r){if(t)throw new TypeError("Generator is already executing.");for(;c;)try{if(t=1,o&&(i=2&r[0]?o.return:r[0]?o.throw||((i=o.return)&&i.call(o),0):o.next)&&!(i=i.call(o,r[1])).done)return i;switch(o=0,i&&(r=[2&r[0],i.value]),r[0]){case 0:case 1:i=r;break;case 4:return c.label++,{value:r[1],done:!1};case 5:c.label++,o=r[1],r=[0];continue;case 7:r=c.ops.pop(),c.trys.pop();continue;default:if(!(i=(i=c.trys).length>0&&i[i.length-1])&&(6===r[0]||2===r[0])){c=0;continue}if(3===r[0]&&(!i||r[1]>i[0]&&r[1]<i[3])){c.label=r[1];break}if(6===r[0]&&c.label<i[1]){c.label=i[1],i=r;break}if(i&&c.label<i[2]){c.label=i[2],c.ops.push(r);break}i[2]&&c.ops.pop(),c.trys.pop();continue}r=n.call(e,c);}catch(a){r=[6,a],o=0;}finally{t=i=0;}if(5&r[0])throw r[1];return {value:r[0]?r[1]:void 0,done:!0}}([r,a])}}},o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var n={};if(null!=e)for(var t in e)Object.hasOwnProperty.call(e,t)&&(n[t]=e[t]);return n.default=e,n},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var r=o(require("reliable")),c=require("./util"),a=i(require("./logger")),s=require("./adapter"),l=require("./enums"),d=function(){function o(e){this.connection=e;}return o.prototype.startConnection=function(e){var n=this._startPeerConnection();if(this.connection.peerConnection=n,this.connection.type===l.ConnectionType.Media&&e._stream&&this._addTracksToConnection(e._stream,n),e.originator){if(this.connection.type===l.ConnectionType.Data){var t=this.connection,o={};c.util.supports.sctp||(o={reliable:e.reliable});var i=n.createDataChannel(t.label,o);t.initialize(i);}this._makeOffer();}else this.handleSDP("OFFER",e.sdp);},o.prototype._startPeerConnection=function(){a.default.log("Creating RTCPeerConnection.");var e={};this.connection.type!==l.ConnectionType.Data||c.util.supports.sctp?this.connection.type===l.ConnectionType.Media&&(e={optional:[{DtlsSrtpKeyAgreement:!0}]}):e={optional:[{RtpDataChannels:!0}]};var n=new s.RTCPeerConnection(this.connection.provider.options.config,e);return this._setupListeners(n),n},o.prototype._setupListeners=function(e){var n=this,t=this.connection.peer,o=this.connection.connectionId,i=this.connection.type,r=this.connection.provider;a.default.log("Listening for ICE candidates."),e.onicecandidate=function(e){e.candidate&&(a.default.log("Received ICE candidates for:",t),r.socket.send({type:l.ServerMessageType.Candidate,payload:{candidate:e.candidate,type:i,connectionId:o},dst:t}));},e.oniceconnectionstatechange=function(){switch(e.iceConnectionState){case"failed":a.default.log("iceConnectionState is failed, closing connections to "+t),n.connection.emit(l.ConnectionEventType.Error,new Error("Negotiation of connection to "+t+" failed.")),n.connection.close();break;case"closed":a.default.log("iceConnectionState is closed, closing connections to "+t),n.connection.emit(l.ConnectionEventType.Error,new Error("Connection to "+t+" closed.")),n.connection.close();break;case"disconnected":a.default.log("iceConnectionState is disconnected, closing connections to "+t),n.connection.emit(l.ConnectionEventType.Error,new Error("Connection to "+t+" disconnected.")),n.connection.close();break;case"completed":e.onicecandidate=c.util.noop;}n.connection.emit(l.ConnectionEventType.IceStateChanged,e.iceConnectionState);},a.default.log("Listening for data channel"),e.ondatachannel=function(e){a.default.log("Received data channel");var n=e.channel;r.getConnection(t,o).initialize(n);},a.default.log("Listening for remote stream"),e.ontrack=function(e){a.default.log("Received remote stream");var i=e.streams[0],c=r.getConnection(t,o);if(c.type===l.ConnectionType.Media){var s=c;n._addStreamToMediaConnection(i,s);}};},o.prototype.cleanup=function(){a.default.log("Cleaning up PeerConnection to "+this.connection.peer);var e=this.connection.peerConnection;if(e){this.connection.peerConnection=null,e.onicecandidate=e.oniceconnectionstatechange=e.ondatachannel=e.ontrack=function(){};var n="closed"!==e.signalingState,t=!1;if(this.connection.type===l.ConnectionType.Data){var o=this.connection.dataChannel;o&&(t=!!o.readyState&&"closed"!==o.readyState);}(n||t)&&e.close();}},o.prototype._makeOffer=function(){return n(this,void 0,Promise,function(){var n,o,i,s,d,p,u;return t(this,function(t){switch(t.label){case 0:n=this.connection.peerConnection,o=this.connection.provider,t.label=1;case 1:return t.trys.push([1,7,,8]),[4,n.createOffer(this.connection.options.constraints)];case 2:i=t.sent(),a.default.log("Created offer."),c.util.supports.sctp||this.connection.type!==l.ConnectionType.Data||(d=this.connection).reliable&&(i.sdp=r.higherBandwidthSDP(i.sdp)),this.connection.options.sdpTransform&&"function"==typeof this.connection.options.sdpTransform&&(i.sdp=this.connection.options.sdpTransform(i.sdp)||i.sdp),t.label=3;case 3:return t.trys.push([3,5,,6]),[4,n.setLocalDescription(i)];case 4:return t.sent(),a.default.log("Set localDescription:",i,"for:"+this.connection.peer),s={sdp:i,type:this.connection.type,connectionId:this.connection.connectionId,metadata:this.connection.metadata,browser:c.util.browser},this.connection.type===l.ConnectionType.Data&&(d=this.connection,s=e({},s,{label:d.label,reliable:d.reliable,serialization:d.serialization})),o.socket.send({type:l.ServerMessageType.Offer,payload:s,dst:this.connection.peer}),[3,6];case 5:return "OperationError: Failed to set local offer sdp: Called in wrong state: kHaveRemoteOffer"!=(p=t.sent())&&(o.emitError(l.PeerErrorType.WebRTC,p),a.default.log("Failed to setLocalDescription, ",p)),[3,6];case 6:return [3,8];case 7:return u=t.sent(),o.emitError(l.PeerErrorType.WebRTC,u),a.default.log("Failed to createOffer, ",u),[3,8];case 8:return [2]}})})},o.prototype._makeAnswer=function(){return n(this,void 0,Promise,function(){var e,n,o,i,s;return t(this,function(t){switch(t.label){case 0:e=this.connection.peerConnection,n=this.connection.provider,t.label=1;case 1:return t.trys.push([1,7,,8]),[4,e.createAnswer()];case 2:o=t.sent(),a.default.log("Created answer."),c.util.supports.sctp||this.connection.type!==l.ConnectionType.Data||this.connection.reliable&&(o.sdp=r.higherBandwidthSDP(o.sdp)),this.connection.options.sdpTransform&&"function"==typeof this.connection.options.sdpTransform&&(o.sdp=this.connection.options.sdpTransform(o.sdp)||o.sdp),t.label=3;case 3:return t.trys.push([3,5,,6]),[4,e.setLocalDescription(o)];case 4:return t.sent(),a.default.log("Set localDescription:",o,"for:"+this.connection.peer),n.socket.send({type:l.ServerMessageType.Answer,payload:{sdp:o,type:this.connection.type,connectionId:this.connection.connectionId,browser:c.util.browser},dst:this.connection.peer}),[3,6];case 5:return i=t.sent(),n.emitError(l.PeerErrorType.WebRTC,i),a.default.log("Failed to setLocalDescription, ",i),[3,6];case 6:return [3,8];case 7:return s=t.sent(),n.emitError(l.PeerErrorType.WebRTC,s),a.default.log("Failed to create answer, ",s),[3,8];case 8:return [2]}})})},o.prototype.handleSDP=function(e,o){return n(this,void 0,Promise,function(){var n,i,r,c;return t(this,function(t){switch(t.label){case 0:o=new s.RTCSessionDescription(o),n=this.connection.peerConnection,i=this.connection.provider,a.default.log("Setting remote description",o),r=this,t.label=1;case 1:return t.trys.push([1,5,,6]),[4,n.setRemoteDescription(o)];case 2:return t.sent(),a.default.log("Set remoteDescription:"+e+" for:"+this.connection.peer),"OFFER"!==e?[3,4]:[4,r._makeAnswer()];case 3:t.sent(),t.label=4;case 4:return [3,6];case 5:return c=t.sent(),i.emitError(l.PeerErrorType.WebRTC,c),a.default.log("Failed to setRemoteDescription, ",c),[3,6];case 6:return [2]}})})},o.prototype.handleCandidate=function(e){return n(this,void 0,Promise,function(){var n,o,i,r,c,d;return t(this,function(t){switch(t.label){case 0:n=e.candidate,o=e.sdpMLineIndex,i=e.sdpMid,r=this.connection.peerConnection,c=this.connection.provider,t.label=1;case 1:return t.trys.push([1,3,,4]),[4,r.addIceCandidate(new s.RTCIceCandidate({sdpMid:i,sdpMLineIndex:o,candidate:n}))];case 2:return t.sent(),a.default.log("Added ICE candidate for:"+this.connection.peer),[3,4];case 3:return d=t.sent(),c.emitError(l.PeerErrorType.WebRTC,d),a.default.log("Failed to handleCandidate, ",d),[3,4];case 4:return [2]}})})},o.prototype._addTracksToConnection=function(e,n){if(a.default.log("add tracks from stream "+e.id+" to peer connection"),!n.addTrack)return a.default.error("Your browser does't support RTCPeerConnection#addTrack. Ignored.");e.getTracks().forEach(function(t){n.addTrack(t,e);});},o.prototype._addStreamToMediaConnection=function(e,n){a.default.log("add stream "+e.id+" to media connection "+n.connectionId),n.addStream(e);},o}();exports.Negotiator=d;
	},{"reliable":"aYFJ","./util":"BHXf","./logger":"8WOs","./adapter":"sXtV","./enums":"9ZRY"}],"tQFK":[function(require,module,exports) {
	var t=this&&this.__extends||function(){var t=function(e,r){return (t=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e;}||function(t,e){for(var r in e)e.hasOwnProperty(r)&&(t[r]=e[r]);})(e,r)};return function(e,r){function n(){this.constructor=e;}t(e,r),e.prototype=null===r?Object.create(r):(n.prototype=r.prototype,new n);}}();Object.defineProperty(exports,"__esModule",{value:!0});var e=require("eventemitter3"),r=function(e){function r(t,r,n){var o=e.call(this)||this;return o.peer=t,o.provider=r,o.options=n,o._open=!1,o.metadata=n.metadata,o}return t(r,e),Object.defineProperty(r.prototype,"open",{get:function(){return this._open},enumerable:!0,configurable:!0}),r}(e.EventEmitter);exports.BaseConnection=r;
	},{"eventemitter3":"2JJl"}],"dbHP":[function(require,module,exports) {
	var e=this&&this.__extends||function(){var e=function(t,o){return (e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var o in t)t.hasOwnProperty(o)&&(e[o]=t[o]);})(t,o)};return function(t,o){function r(){this.constructor=t;}e(t,o),t.prototype=null===o?Object.create(o):(r.prototype=o.prototype,new r);}}(),t=this&&this.__assign||function(){return (t=Object.assign||function(e){for(var t,o=1,r=arguments.length;o<r;o++)for(var n in t=arguments[o])Object.prototype.hasOwnProperty.call(t,n)&&(e[n]=t[n]);return e}).apply(this,arguments)},o=this&&this.__values||function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],o=0;return t?t.call(e):{next:function(){return e&&o>=e.length&&(e=void 0),{value:e&&e[o++],done:!e}}}},r=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var n=require("./util"),i=r(require("./logger")),a=require("./negotiator"),s=require("./enums"),l=require("./baseconnection"),c=function(r){function l(e,t,o){var i=r.call(this,e,t,o)||this;return i._localStream=i.options._stream,i.connectionId=i.options.connectionId||l.ID_PREFIX+n.util.randomToken(),i._negotiator=new a.Negotiator(i),i._localStream&&i._negotiator.startConnection({_stream:i._localStream,originator:!0}),i}return e(l,r),Object.defineProperty(l.prototype,"type",{get:function(){return s.ConnectionType.Media},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"localStream",{get:function(){return this._localStream},enumerable:!0,configurable:!0}),Object.defineProperty(l.prototype,"remoteStream",{get:function(){return this._remoteStream},enumerable:!0,configurable:!0}),l.prototype.addStream=function(e){i.default.log("Receiving stream",e),this._remoteStream=e,r.prototype.emit.call(this,s.ConnectionEventType.Stream,e);},l.prototype.handleMessage=function(e){var t=e.type,o=e.payload;switch(e.type){case s.ServerMessageType.Answer:this._negotiator.handleSDP(t,o.sdp),this._open=!0;break;case s.ServerMessageType.Candidate:this._negotiator.handleCandidate(o.candidate);break;default:i.default.warn("Unrecognized message type:"+t+" from peer:"+this.peer);}},l.prototype.answer=function(e,r){var n,a;if(void 0===r&&(r={}),this._localStream)i.default.warn("Local stream already exists on this MediaConnection. Are you answering a call twice?");else{this._localStream=e,r&&r.sdpTransform&&(this.options.sdpTransform=r.sdpTransform),this._negotiator.startConnection(t({},this.options._payload,{_stream:e}));var s=this.provider._getMessages(this.connectionId);try{for(var l=o(s),c=l.next();!c.done;c=l.next()){var p=c.value;this.handleMessage(p);}}catch(u){n={error:u};}finally{try{c&&!c.done&&(a=l.return)&&a.call(l);}finally{if(n)throw n.error}}this._open=!0;}},l.prototype.close=function(){this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this._localStream=null,this._remoteStream=null,this.provider&&(this.provider._removeConnection(this),this.provider=null),this.options&&this.options._stream&&(this.options._stream=null),this.open&&(this._open=!1,r.prototype.emit.call(this,s.ConnectionEventType.Close));},l.ID_PREFIX="mc_",l}(l.BaseConnection);exports.MediaConnection=c;
	},{"./util":"BHXf","./logger":"8WOs","./negotiator":"HCdX","./enums":"9ZRY","./baseconnection":"tQFK"}],"GBTQ":[function(require,module,exports) {
	var e=this&&this.__extends||function(){var e=function(t,n){return (e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);})(t,n)};return function(t,n){function i(){this.constructor=t;}e(t,n),t.prototype=null===n?Object.create(n):(i.prototype=n.prototype,new i);}}(),t=this&&this.__values||function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0;return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}},n=this&&this.__importStar||function(e){if(e&&e.__esModule)return e;var t={};if(null!=e)for(var n in e)Object.hasOwnProperty.call(e,n)&&(t[n]=e[n]);return t.default=e,t};Object.defineProperty(exports,"__esModule",{value:!0});var i=require("reliable"),r=require("./util"),o=n(require("./logger")),a=require("./negotiator"),s=require("./enums"),u=require("./baseconnection"),l=function(n){function u(e,t,i){var o=n.call(this,e,t,i)||this;return o._buffer=[],o._bufferSize=0,o._buffering=!1,o._chunkedData={},o.connectionId=o.options.connectionId||u.ID_PREFIX+r.util.randomToken(),o.label=o.options.label||o.connectionId,o.serialization=o.options.serialization||s.SerializationType.Binary,o.reliable=o.options.reliable,o.options._payload&&(o._peerBrowser=o.options._payload.browser),o._negotiator=new a.Negotiator(o),o._negotiator.startConnection(o.options._payload||{originator:!0}),o}return e(u,n),Object.defineProperty(u.prototype,"type",{get:function(){return s.ConnectionType.Data},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"dataChannel",{get:function(){return this._dc},enumerable:!0,configurable:!0}),Object.defineProperty(u.prototype,"bufferSize",{get:function(){return this._bufferSize},enumerable:!0,configurable:!0}),u.prototype.initialize=function(e){this._dc=e,this._configureDataChannel();},u.prototype._configureDataChannel=function(){var e=this;if(r.util.supports.sctp&&(this.dataChannel.binaryType="arraybuffer"),this.dataChannel.onopen=function(){o.default.log("Data channel connection success"),e._open=!0,e.emit(s.ConnectionEventType.Open);},!r.util.supports.sctp&&this.reliable){var t=o.default.logLevel>o.LogLevel.Disabled;this._reliable=new i.Reliable(this.dataChannel,t);}this._reliable?this._reliable.onmessage=function(t){e.emit(s.ConnectionEventType.Data,t);}:this.dataChannel.onmessage=function(t){e._handleDataMessage(t);},this.dataChannel.onclose=function(){o.default.log("DataChannel closed for:",e.peer),e.close();};},u.prototype._handleDataMessage=function(e){var t=this,i=e.data,o=i.constructor,a=i;if(this.serialization===s.SerializationType.Binary||this.serialization===s.SerializationType.BinaryUTF8){if(o===Blob)return void r.util.blobToArrayBuffer(i,function(e){var n=r.util.unpack(e);t.emit(s.ConnectionEventType.Data,n);});if(o===ArrayBuffer)a=r.util.unpack(i);else if(o===String){var u=r.util.binaryStringToArrayBuffer(i);a=r.util.unpack(u);}}else this.serialization===s.SerializationType.JSON&&(a=JSON.parse(i));a.__peerData?this._handleChunk(a):n.prototype.emit.call(this,s.ConnectionEventType.Data,a);},u.prototype._handleChunk=function(e){var t=e.__peerData,n=this._chunkedData[t]||{data:[],count:0,total:e.total};if(n.data[e.n]=e.data,n.count++,this._chunkedData[t]=n,n.total===n.count){delete this._chunkedData[t];var i=new Blob(n.data);this._handleDataMessage({data:i});}},u.prototype.close=function(){this._buffer=[],this._bufferSize=0,this._chunkedData={},this._negotiator&&(this._negotiator.cleanup(),this._negotiator=null),this.provider&&(this.provider._removeConnection(this),this.provider=null),this.open&&(this._open=!1,n.prototype.emit.call(this,s.ConnectionEventType.Close));},u.prototype.send=function(e,t){var i=this;if(this.open)if(this._reliable)this._reliable.send(e);else if(this.serialization===s.SerializationType.JSON)this._bufferedSend(JSON.stringify(e));else if(this.serialization===s.SerializationType.Binary||this.serialization===s.SerializationType.BinaryUTF8){var o=r.util.pack(e);if((r.util.chunkedBrowsers[this._peerBrowser]||r.util.chunkedBrowsers[r.util.browser])&&!t&&o.size>r.util.chunkedMTU)return void this._sendChunks(o);r.util.supports.sctp?r.util.supports.binaryBlob?this._bufferedSend(o):r.util.blobToArrayBuffer(o,function(e){i._bufferedSend(e);}):r.util.blobToBinaryString(o,function(e){i._bufferedSend(e);});}else this._bufferedSend(e);else n.prototype.emit.call(this,s.ConnectionEventType.Error,new Error("Connection is not open. You should listen for the `open` event before sending messages."));},u.prototype._bufferedSend=function(e){!this._buffering&&this._trySend(e)||(this._buffer.push(e),this._bufferSize=this._buffer.length);},u.prototype._trySend=function(e){var t=this;if(!this.open)return !1;try{this.dataChannel.send(e);}catch(n){return this._buffering=!0,setTimeout(function(){t._buffering=!1,t._tryBuffer();},100),!1}return !0},u.prototype._tryBuffer=function(){if(this.open&&0!==this._buffer.length){var e=this._buffer[0];this._trySend(e)&&(this._buffer.shift(),this._bufferSize=this._buffer.length,this._tryBuffer());}},u.prototype._sendChunks=function(e){var n,i,o=r.util.chunk(e);try{for(var a=t(o),s=a.next();!s.done;s=a.next()){var u=s.value;this.send(u,!0);}}catch(l){n={error:l};}finally{try{s&&!s.done&&(i=a.return)&&i.call(a);}finally{if(n)throw n.error}}},u.prototype.handleMessage=function(e){var t=e.payload;switch(e.type){case s.ServerMessageType.Answer:this._peerBrowser=t.browser,this._negotiator.handleSDP(e.type,t.sdp);break;case s.ServerMessageType.Candidate:this._negotiator.handleCandidate(t.candidate);break;default:o.default.warn("Unrecognized message type:",e.type,"from peer:",this.peer);}},u.ID_PREFIX="dc_",u}(u.BaseConnection);exports.DataConnection=l;
	},{"reliable":"aYFJ","./util":"BHXf","./logger":"8WOs","./negotiator":"HCdX","./enums":"9ZRY","./baseconnection":"tQFK"}],"in7L":[function(require,module,exports) {
	var t=this&&this.__awaiter||function(t,e,r,o){return new(r||(r=Promise))(function(n,s){function i(t){try{a(o.next(t));}catch(e){s(e);}}function u(t){try{a(o.throw(t));}catch(e){s(e);}}function a(t){t.done?n(t.value):new r(function(e){e(t.value);}).then(i,u);}a((o=o.apply(t,e||[])).next());})},e=this&&this.__generator||function(t,e){var r,o,n,s,i={label:0,sent:function(){if(1&n[0])throw n[1];return n[1]},trys:[],ops:[]};return s={next:u(0),throw:u(1),return:u(2)},"function"==typeof Symbol&&(s[Symbol.iterator]=function(){return this}),s;function u(s){return function(u){return function(s){if(r)throw new TypeError("Generator is already executing.");for(;i;)try{if(r=1,o&&(n=2&s[0]?o.return:s[0]?o.throw||((n=o.return)&&n.call(o),0):o.next)&&!(n=n.call(o,s[1])).done)return n;switch(o=0,n&&(s=[2&s[0],n.value]),s[0]){case 0:case 1:n=s;break;case 4:return i.label++,{value:s[1],done:!1};case 5:i.label++,o=s[1],s=[0];continue;case 7:s=i.ops.pop(),i.trys.pop();continue;default:if(!(n=(n=i.trys).length>0&&n[n.length-1])&&(6===s[0]||2===s[0])){i=0;continue}if(3===s[0]&&(!n||s[1]>n[0]&&s[1]<n[3])){i.label=s[1];break}if(6===s[0]&&i.label<n[1]){i.label=n[1],n=s;break}if(n&&i.label<n[2]){i.label=n[2],i.ops.push(s);break}n[2]&&i.ops.pop(),i.trys.pop();continue}s=e.call(t,i);}catch(u){s=[6,u],o=0;}finally{r=n=0;}if(5&s[0])throw s[1];return {value:s[0]?s[1]:void 0,done:!0}}([s,u])}}},r=this&&this.__importDefault||function(t){return t&&t.__esModule?t:{default:t}};Object.defineProperty(exports,"__esModule",{value:!0});var o=require("./util"),n=r(require("./logger")),s=function(){function r(t){this._options=t;}return r.prototype._buildUrl=function(t){var e=(this._options.secure?"https://":"http://")+this._options.host+":"+this._options.port+this._options.path+this._options.key+"/"+t;return e+="?ts="+(new Date).getTime()+Math.random()},r.prototype.retrieveId=function(){return t(this,void 0,Promise,function(){var t,r,s,i;return e(this,function(e){switch(e.label){case 0:t=this._buildUrl("id"),e.label=1;case 1:return e.trys.push([1,3,,4]),[4,fetch(t)];case 2:if(200!==(r=e.sent()).status)throw new Error("Error. Status:"+r.status);return [2,r.text()];case 3:throw s=e.sent(),n.default.error("Error retrieving ID",s),i="","/"===this._options.path&&this._options.host!==o.util.CLOUD_HOST&&(i=" If you passed in a `path` to your self-hosted PeerServer, you'll also need to pass in that same path when creating a new Peer."),new Error("Could not get an ID from the server."+i);case 4:return [2]}})})},r.prototype.listAllPeers=function(){return t(this,void 0,Promise,function(){var t,r,s,i;return e(this,function(e){switch(e.label){case 0:t=this._buildUrl("peers"),e.label=1;case 1:return e.trys.push([1,3,,4]),[4,fetch(t)];case 2:if(200!==(r=e.sent()).status){if(401===r.status)throw s="",s=this._options.host===o.util.CLOUD_HOST?"It looks like you're using the cloud server. You can email team@peerjs.com to enable peer listing for your API key.":"You need to enable `allow_discovery` on your self-hosted PeerServer to use this feature.",new Error("It doesn't look like you have permission to list peers IDs. "+s);throw new Error("Error. Status:"+r.status)}return [2,r.json()];case 3:throw i=e.sent(),n.default.error("Error retrieving list peers",i),new Error("Could not get list peers from the server."+i);case 4:return [2]}})})},r}();exports.API=s;
	},{"./util":"BHXf","./logger":"8WOs"}],"Hxpd":[function(require,module,exports) {
	var e=this&&this.__extends||function(){var e=function(t,n){return (e=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t;}||function(e,t){for(var n in t)t.hasOwnProperty(n)&&(e[n]=t[n]);})(t,n)};return function(t,n){function r(){this.constructor=t;}e(t,n),t.prototype=null===n?Object.create(n):(r.prototype=n.prototype,new r);}}(),t=this&&this.__assign||function(){return (t=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var o in t=arguments[n])Object.prototype.hasOwnProperty.call(t,o)&&(e[o]=t[o]);return e}).apply(this,arguments)},n=this&&this.__values||function(e){var t="function"==typeof Symbol&&e[Symbol.iterator],n=0;return t?t.call(e):{next:function(){return e&&n>=e.length&&(e=void 0),{value:e&&e[n++],done:!e}}}},r=this&&this.__read||function(e,t){var n="function"==typeof Symbol&&e[Symbol.iterator];if(!n)return e;var r,o,i=n.call(e),s=[];try{for(;(void 0===t||t-- >0)&&!(r=i.next()).done;)s.push(r.value);}catch(c){o={error:c};}finally{try{r&&!r.done&&(n=i.return)&&n.call(i);}finally{if(o)throw o.error}}return s},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(exports,"__esModule",{value:!0});var i=require("eventemitter3"),s=require("./util"),c=o(require("./logger")),a=require("./socket"),l=require("./mediaconnection"),d=require("./dataconnection"),u=require("./enums"),p=require("./api"),f=function(o){function i(e,n){var r=o.call(this)||this;return r._destroyed=!1,r._disconnected=!1,r._open=!1,r._connections=new Map,r._lostMessages=new Map,e&&e.constructor==Object?(n=e,e=void 0):e&&(e=e.toString()),n=t({debug:0,host:s.util.CLOUD_HOST,port:s.util.CLOUD_PORT,path:"/",key:i.DEFAULT_KEY,token:s.util.randomToken(),config:s.util.defaultConfig},n),r._options=n,"/"===n.host&&(n.host=window.location.hostname),"/"!==n.path[0]&&(n.path="/"+n.path),"/"!==n.path[n.path.length-1]&&(n.path+="/"),void 0===n.secure&&n.host!==s.util.CLOUD_HOST?n.secure=s.util.isSecure():n.host==s.util.CLOUD_HOST&&(n.secure=!0),n.logFunction&&c.default.setLogFunction(n.logFunction),c.default.logLevel=n.debug,s.util.supports.audioVideo||s.util.supports.data?s.util.validateId(e)?(r._api=new p.API(n),r._initializeServerConnection(),e?r._initialize(e):r._api.retrieveId().then(function(e){return r._initialize(e)}).catch(function(e){return r._abort(u.PeerErrorType.ServerError,e)}),r):(r._delayedAbort(u.PeerErrorType.InvalidID,'ID "'+e+'" is invalid'),r):(r._delayedAbort(u.PeerErrorType.BrowserIncompatible,"The current browser does not support WebRTC"),r)}return e(i,o),Object.defineProperty(i.prototype,"id",{get:function(){return this._id},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"options",{get:function(){return this._options},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"open",{get:function(){return this._open},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"socket",{get:function(){return this._socket},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"connections",{get:function(){var e,t,o=Object.create(null);try{for(var i=n(this._connections),s=i.next();!s.done;s=i.next()){var c=r(s.value,2),a=c[0],l=c[1];o[a]=l;}}catch(d){e={error:d};}finally{try{s&&!s.done&&(t=i.return)&&t.call(i);}finally{if(e)throw e.error}}return o},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"destroyed",{get:function(){return this._destroyed},enumerable:!0,configurable:!0}),Object.defineProperty(i.prototype,"disconnected",{get:function(){return this._disconnected},enumerable:!0,configurable:!0}),i.prototype._initializeServerConnection=function(){var e=this;this._socket=new a.Socket(this._options.secure,this._options.host,this._options.port,this._options.path,this._options.key,this._options.pingInterval),this.socket.on(u.SocketEventType.Message,function(t){e._handleMessage(t);}),this.socket.on(u.SocketEventType.Error,function(t){e._abort(u.PeerErrorType.SocketError,t);}),this.socket.on(u.SocketEventType.Disconnected,function(){e.disconnected||(e.emitError(u.PeerErrorType.Network,"Lost connection to server."),e.disconnect());}),this.socket.on(u.SocketEventType.Close,function(){e.disconnected||e._abort(u.PeerErrorType.SocketClosed,"Underlying socket is already closed.");});},i.prototype._initialize=function(e){this._id=e,this.socket.start(this.id,this._options.token);},i.prototype._handleMessage=function(e){var t,r,o=e.type,i=e.payload,s=e.src;switch(o){case u.ServerMessageType.Open:this.emit(u.PeerEventType.Open,this.id),this._open=!0;break;case u.ServerMessageType.Error:this._abort(u.PeerErrorType.ServerError,i.msg);break;case u.ServerMessageType.IdTaken:this._abort(u.PeerErrorType.UnavailableID,'ID "'+this.id+'" is taken');break;case u.ServerMessageType.InvalidKey:this._abort(u.PeerErrorType.InvalidKey,'API KEY "'+this._options.key+'" is invalid');break;case u.ServerMessageType.Leave:c.default.log("Received leave message from",s),this._cleanupPeer(s),this._connections.delete(s);break;case u.ServerMessageType.Expire:this.emitError(u.PeerErrorType.PeerUnavailable,"Could not connect to peer "+s);break;case u.ServerMessageType.Offer:var a=i.connectionId;if((_=this.getConnection(s,a))&&(_.close(),c.default.warn("Offer received for existing Connection ID:",a)),i.type===u.ConnectionType.Media)_=new l.MediaConnection(s,this,{connectionId:a,_payload:i,metadata:i.metadata}),this._addConnection(s,_),this.emit(u.PeerEventType.Call,_);else{if(i.type!==u.ConnectionType.Data)return void c.default.warn("Received malformed connection type:",i.type);_=new d.DataConnection(s,this,{connectionId:a,_payload:i,metadata:i.metadata,label:i.label,serialization:i.serialization,reliable:i.reliable}),this._addConnection(s,_),this.emit(u.PeerEventType.Connection,_);}var p=this._getMessages(a);try{for(var h=n(p),f=h.next();!f.done;f=h.next()){var y=f.value;_.handleMessage(y);}}catch(v){t={error:v};}finally{try{f&&!f.done&&(r=h.return)&&r.call(h);}finally{if(t)throw t.error}}break;default:if(!i)return void c.default.warn("You received a malformed message from "+s+" of type "+o);var _;a=i.connectionId;(_=this.getConnection(s,a))&&_.peerConnection?_.handleMessage(e):a?this._storeMessage(a,e):c.default.warn("You received an unrecognized message:",e);}},i.prototype._storeMessage=function(e,t){this._lostMessages.has(e)||this._lostMessages.set(e,[]),this._lostMessages.get(e).push(t);},i.prototype._getMessages=function(e){var t=this._lostMessages.get(e);return t?(this._lostMessages.delete(e),t):[]},i.prototype.connect=function(e,t){if(void 0===t&&(t={}),this.disconnected)return c.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect, or call reconnect on this peer if you believe its ID to still be available."),void this.emitError(u.PeerErrorType.Disconnected,"Cannot connect to new Peer after disconnecting from server.");var n=new d.DataConnection(e,this,t);return this._addConnection(e,n),n},i.prototype.call=function(e,t,n){if(void 0===n&&(n={}),this.disconnected)return c.default.warn("You cannot connect to a new Peer because you called .disconnect() on this Peer and ended your connection with the server. You can create a new Peer to reconnect."),void this.emitError(u.PeerErrorType.Disconnected,"Cannot connect to new Peer after disconnecting from server.");if(t){n._stream=t;var r=new l.MediaConnection(e,this,n);return this._addConnection(e,r),r}c.default.error("To call a peer, you must provide a stream from your browser's `getUserMedia`.");},i.prototype._addConnection=function(e,t){c.default.log("add connection "+t.type+":"+t.connectionId+"\n       to peerId:"+e),this._connections.has(e)||this._connections.set(e,[]),this._connections.get(e).push(t);},i.prototype._removeConnection=function(e){var t=this._connections.get(e.peer);if(t){var n=t.indexOf(e);-1!==n&&t.splice(n,1);}this._lostMessages.delete(e.connectionId);},i.prototype.getConnection=function(e,t){var r,o,i=this._connections.get(e);if(!i)return null;try{for(var s=n(i),c=s.next();!c.done;c=s.next()){var a=c.value;if(a.connectionId===t)return a}}catch(l){r={error:l};}finally{try{c&&!c.done&&(o=s.return)&&o.call(s);}finally{if(r)throw r.error}}return null},i.prototype._delayedAbort=function(e,t){var n=this;setTimeout(function(){n._abort(e,t);},0);},i.prototype._abort=function(e,t){c.default.error("Aborting!"),this._lastServerId?this.disconnect():this.destroy(),this.emitError(e,t);},i.prototype.emitError=function(e,t){c.default.error("Error:",t),"string"==typeof t&&(t=new Error(t)),t.type=e,this.emit(u.PeerEventType.Error,t);},i.prototype.destroy=function(){this.destroyed||(this._cleanup(),this.disconnect(),this._destroyed=!0);},i.prototype._cleanup=function(){var e,t;try{for(var r=n(this._connections.keys()),o=r.next();!o.done;o=r.next()){var i=o.value;this._cleanupPeer(i),this._connections.delete(i);}}catch(s){e={error:s};}finally{try{o&&!o.done&&(t=r.return)&&t.call(r);}finally{if(e)throw e.error}}this.emit(u.PeerEventType.Close);},i.prototype._cleanupPeer=function(e){var t,r,o=this._connections.get(e);if(o)try{for(var i=n(o),s=i.next();!s.done;s=i.next()){s.value.close();}}catch(c){t={error:c};}finally{try{s&&!s.done&&(r=i.return)&&r.call(i);}finally{if(t)throw t.error}}},i.prototype.disconnect=function(){var e=this;setTimeout(function(){e.disconnected||(e._disconnected=!0,e._open=!1,e.socket&&e.socket.close(),e.emit(u.PeerEventType.Disconnected,e.id),e._lastServerId=e.id,e._id=null);},0);},i.prototype.reconnect=function(){if(this.disconnected&&!this.destroyed)c.default.log("Attempting reconnection to server with ID "+this._lastServerId),this._disconnected=!1,this._initializeServerConnection(),this._initialize(this._lastServerId);else{if(this.destroyed)throw new Error("This peer cannot reconnect to the server. It has already been destroyed.");if(this.disconnected||this.open)throw new Error("Peer "+this.id+" cannot reconnect because it is not disconnected from the server!");c.default.error("In a hurry? We're still trying to make the initial connection!");}},i.prototype.listAllPeers=function(e){var t=this;void 0===e&&(e=function(e){}),this._api.listAllPeers().then(function(t){return e(t)}).catch(function(e){return t._abort(u.PeerErrorType.ServerError,e)});},i.DEFAULT_KEY="peerjs",i}(i.EventEmitter);exports.Peer=f;
	},{"eventemitter3":"2JJl","./util":"BHXf","./logger":"8WOs","./socket":"wJlv","./mediaconnection":"dbHP","./dataconnection":"GBTQ","./enums":"9ZRY","./api":"in7L"}],"iTK6":[function(require,module,exports) {
	Object.defineProperty(exports,"__esModule",{value:!0});var e=require("./util"),r=require("./peer");exports.peerjs={Peer:r.Peer,util:e.util},exports.default=r.Peer,window.peerjs=exports.peerjs,window.Peer=r.Peer;
	},{"./util":"BHXf","./peer":"Hxpd"}]},{},["iTK6"]);

	});

	var Peer = unwrapExports(peerjs_min);

	var bignumber = createCommonjsModule(function (module) {
	(function (globalObject) {

	/*
	 *      bignumber.js v8.0.1
	 *      A JavaScript library for arbitrary-precision arithmetic.
	 *      https://github.com/MikeMcl/bignumber.js
	 *      Copyright (c) 2018 Michael Mclaughlin <M8ch88l@gmail.com>
	 *      MIT Licensed.
	 *
	 *      BigNumber.prototype methods     |  BigNumber methods
	 *                                      |
	 *      absoluteValue            abs    |  clone
	 *      comparedTo                      |  config               set
	 *      decimalPlaces            dp     |      DECIMAL_PLACES
	 *      dividedBy                div    |      ROUNDING_MODE
	 *      dividedToIntegerBy       idiv   |      EXPONENTIAL_AT
	 *      exponentiatedBy          pow    |      RANGE
	 *      integerValue                    |      CRYPTO
	 *      isEqualTo                eq     |      MODULO_MODE
	 *      isFinite                        |      POW_PRECISION
	 *      isGreaterThan            gt     |      FORMAT
	 *      isGreaterThanOrEqualTo   gte    |      ALPHABET
	 *      isInteger                       |  isBigNumber
	 *      isLessThan               lt     |  maximum              max
	 *      isLessThanOrEqualTo      lte    |  minimum              min
	 *      isNaN                           |  random
	 *      isNegative                      |  sum
	 *      isPositive                      |
	 *      isZero                          |
	 *      minus                           |
	 *      modulo                   mod    |
	 *      multipliedBy             times  |
	 *      negated                         |
	 *      plus                            |
	 *      precision                sd     |
	 *      shiftedBy                       |
	 *      squareRoot               sqrt   |
	 *      toExponential                   |
	 *      toFixed                         |
	 *      toFormat                        |
	 *      toFraction                      |
	 *      toJSON                          |
	 *      toNumber                        |
	 *      toPrecision                     |
	 *      toString                        |
	 *      valueOf                         |
	 *
	 */


	  var BigNumber,
	    isNumeric = /^-?(?:\d+(?:\.\d*)?|\.\d+)(?:e[+-]?\d+)?$/i,

	    mathceil = Math.ceil,
	    mathfloor = Math.floor,

	    bignumberError = '[BigNumber Error] ',
	    tooManyDigits = bignumberError + 'Number primitive has more than 15 significant digits: ',

	    BASE = 1e14,
	    LOG_BASE = 14,
	    MAX_SAFE_INTEGER = 0x1fffffffffffff,         // 2^53 - 1
	    // MAX_INT32 = 0x7fffffff,                   // 2^31 - 1
	    POWS_TEN = [1, 10, 100, 1e3, 1e4, 1e5, 1e6, 1e7, 1e8, 1e9, 1e10, 1e11, 1e12, 1e13],
	    SQRT_BASE = 1e7,

	    // EDITABLE
	    // The limit on the value of DECIMAL_PLACES, TO_EXP_NEG, TO_EXP_POS, MIN_EXP, MAX_EXP, and
	    // the arguments to toExponential, toFixed, toFormat, and toPrecision.
	    MAX = 1E9;                                   // 0 to MAX_INT32


	  /*
	   * Create and return a BigNumber constructor.
	   */
	  function clone(configObject) {
	    var div, convertBase, parseNumeric,
	      P = BigNumber.prototype = { constructor: BigNumber, toString: null, valueOf: null },
	      ONE = new BigNumber(1),


	      //----------------------------- EDITABLE CONFIG DEFAULTS -------------------------------


	      // The default values below must be integers within the inclusive ranges stated.
	      // The values can also be changed at run-time using BigNumber.set.

	      // The maximum number of decimal places for operations involving division.
	      DECIMAL_PLACES = 20,                     // 0 to MAX

	      // The rounding mode used when rounding to the above decimal places, and when using
	      // toExponential, toFixed, toFormat and toPrecision, and round (default value).
	      // UP         0 Away from zero.
	      // DOWN       1 Towards zero.
	      // CEIL       2 Towards +Infinity.
	      // FLOOR      3 Towards -Infinity.
	      // HALF_UP    4 Towards nearest neighbour. If equidistant, up.
	      // HALF_DOWN  5 Towards nearest neighbour. If equidistant, down.
	      // HALF_EVEN  6 Towards nearest neighbour. If equidistant, towards even neighbour.
	      // HALF_CEIL  7 Towards nearest neighbour. If equidistant, towards +Infinity.
	      // HALF_FLOOR 8 Towards nearest neighbour. If equidistant, towards -Infinity.
	      ROUNDING_MODE = 4,                       // 0 to 8

	      // EXPONENTIAL_AT : [TO_EXP_NEG , TO_EXP_POS]

	      // The exponent value at and beneath which toString returns exponential notation.
	      // Number type: -7
	      TO_EXP_NEG = -7,                         // 0 to -MAX

	      // The exponent value at and above which toString returns exponential notation.
	      // Number type: 21
	      TO_EXP_POS = 21,                         // 0 to MAX

	      // RANGE : [MIN_EXP, MAX_EXP]

	      // The minimum exponent value, beneath which underflow to zero occurs.
	      // Number type: -324  (5e-324)
	      MIN_EXP = -1e7,                          // -1 to -MAX

	      // The maximum exponent value, above which overflow to Infinity occurs.
	      // Number type:  308  (1.7976931348623157e+308)
	      // For MAX_EXP > 1e7, e.g. new BigNumber('1e100000000').plus(1) may be slow.
	      MAX_EXP = 1e7,                           // 1 to MAX

	      // Whether to use cryptographically-secure random number generation, if available.
	      CRYPTO = false,                          // true or false

	      // The modulo mode used when calculating the modulus: a mod n.
	      // The quotient (q = a / n) is calculated according to the corresponding rounding mode.
	      // The remainder (r) is calculated as: r = a - n * q.
	      //
	      // UP        0 The remainder is positive if the dividend is negative, else is negative.
	      // DOWN      1 The remainder has the same sign as the dividend.
	      //             This modulo mode is commonly known as 'truncated division' and is
	      //             equivalent to (a % n) in JavaScript.
	      // FLOOR     3 The remainder has the same sign as the divisor (Python %).
	      // HALF_EVEN 6 This modulo mode implements the IEEE 754 remainder function.
	      // EUCLID    9 Euclidian division. q = sign(n) * floor(a / abs(n)).
	      //             The remainder is always positive.
	      //
	      // The truncated division, floored division, Euclidian division and IEEE 754 remainder
	      // modes are commonly used for the modulus operation.
	      // Although the other rounding modes can also be used, they may not give useful results.
	      MODULO_MODE = 1,                         // 0 to 9

	      // The maximum number of significant digits of the result of the exponentiatedBy operation.
	      // If POW_PRECISION is 0, there will be unlimited significant digits.
	      POW_PRECISION = 0,                    // 0 to MAX

	      // The format specification used by the BigNumber.prototype.toFormat method.
	      FORMAT = {
	        prefix: '',
	        groupSize: 3,
	        secondaryGroupSize: 0,
	        groupSeparator: ',',
	        decimalSeparator: '.',
	        fractionGroupSize: 0,
	        fractionGroupSeparator: '\xA0',      // non-breaking space
	        suffix: ''
	      },

	      // The alphabet used for base conversion. It must be at least 2 characters long, with no '+',
	      // '-', '.', whitespace, or repeated character.
	      // '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$_'
	      ALPHABET = '0123456789abcdefghijklmnopqrstuvwxyz';


	    //------------------------------------------------------------------------------------------


	    // CONSTRUCTOR


	    /*
	     * The BigNumber constructor and exported function.
	     * Create and return a new instance of a BigNumber object.
	     *
	     * n {number|string|BigNumber} A numeric value.
	     * [b] {number} The base of n. Integer, 2 to ALPHABET.length inclusive.
	     */
	    function BigNumber(n, b) {
	      var alphabet, c, caseChanged, e, i, isNum, len, str,
	        x = this;

	      // Enable constructor usage without new.
	      if (!(x instanceof BigNumber)) {

	        // Don't throw on constructor call without new (#81).
	        // '[BigNumber Error] Constructor call without new: {n}'
	        //throw Error(bignumberError + ' Constructor call without new: ' + n);
	        return new BigNumber(n, b);
	      }

	      if (b == null) {

	        // Duplicate.
	        if (n instanceof BigNumber) {
	          x.s = n.s;
	          x.e = n.e;
	          x.c = (n = n.c) ? n.slice() : n;
	          return;
	        }

	        isNum = typeof n == 'number';

	        if (isNum && n * 0 == 0) {

	          // Use `1 / n` to handle minus zero also.
	          x.s = 1 / n < 0 ? (n = -n, -1) : 1;

	          // Faster path for integers.
	          if (n === ~~n) {
	            for (e = 0, i = n; i >= 10; i /= 10, e++);
	            x.e = e;
	            x.c = [n];
	            return;
	          }

	          str = String(n);
	        } else {
	          str = String(n);
	          if (!isNumeric.test(str)) return parseNumeric(x, str, isNum);
	          x.s = str.charCodeAt(0) == 45 ? (str = str.slice(1), -1) : 1;
	        }

	        // Decimal point?
	        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');

	        // Exponential form?
	        if ((i = str.search(/e/i)) > 0) {

	          // Determine exponent.
	          if (e < 0) e = i;
	          e += +str.slice(i + 1);
	          str = str.substring(0, i);
	        } else if (e < 0) {

	          // Integer.
	          e = str.length;
	        }

	      } else {

	        // '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
	        intCheck(b, 2, ALPHABET.length, 'Base');
	        str = String(n);

	        // Allow exponential notation to be used with base 10 argument, while
	        // also rounding to DECIMAL_PLACES as with other bases.
	        if (b == 10) {
	          x = new BigNumber(n instanceof BigNumber ? n : str);
	          return round(x, DECIMAL_PLACES + x.e + 1, ROUNDING_MODE);
	        }

	        isNum = typeof n == 'number';

	        if (isNum) {

	          // Avoid potential interpretation of Infinity and NaN as base 44+ values.
	          if (n * 0 != 0) return parseNumeric(x, str, isNum, b);

	          x.s = 1 / n < 0 ? (str = str.slice(1), -1) : 1;

	          // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
	          if (BigNumber.DEBUG && str.replace(/^0\.0*|\./, '').length > 15) {
	            throw Error
	             (tooManyDigits + n);
	          }

	          // Prevent later check for length on converted number.
	          isNum = false;
	        } else {
	          x.s = str.charCodeAt(0) === 45 ? (str = str.slice(1), -1) : 1;
	        }

	        alphabet = ALPHABET.slice(0, b);
	        e = i = 0;

	        // Check that str is a valid base b number.
	        // Don't use RegExp so alphabet can contain special characters.
	        for (len = str.length; i < len; i++) {
	          if (alphabet.indexOf(c = str.charAt(i)) < 0) {
	            if (c == '.') {

	              // If '.' is not the first character and it has not be found before.
	              if (i > e) {
	                e = len;
	                continue;
	              }
	            } else if (!caseChanged) {

	              // Allow e.g. hexadecimal 'FF' as well as 'ff'.
	              if (str == str.toUpperCase() && (str = str.toLowerCase()) ||
	                  str == str.toLowerCase() && (str = str.toUpperCase())) {
	                caseChanged = true;
	                i = -1;
	                e = 0;
	                continue;
	              }
	            }

	            return parseNumeric(x, String(n), isNum, b);
	          }
	        }

	        str = convertBase(str, b, 10, x.s);

	        // Decimal point?
	        if ((e = str.indexOf('.')) > -1) str = str.replace('.', '');
	        else e = str.length;
	      }

	      // Determine leading zeros.
	      for (i = 0; str.charCodeAt(i) === 48; i++);

	      // Determine trailing zeros.
	      for (len = str.length; str.charCodeAt(--len) === 48;);

	      str = str.slice(i, ++len);

	      if (str) {
	        len -= i;

	        // '[BigNumber Error] Number primitive has more than 15 significant digits: {n}'
	        if (isNum && BigNumber.DEBUG &&
	          len > 15 && (n > MAX_SAFE_INTEGER || n !== mathfloor(n))) {
	            throw Error
	             (tooManyDigits + (x.s * n));
	        }

	        e = e - i - 1;

	         // Overflow?
	        if (e > MAX_EXP) {

	          // Infinity.
	          x.c = x.e = null;

	        // Underflow?
	        } else if (e < MIN_EXP) {

	          // Zero.
	          x.c = [x.e = 0];
	        } else {
	          x.e = e;
	          x.c = [];

	          // Transform base

	          // e is the base 10 exponent.
	          // i is where to slice str to get the first element of the coefficient array.
	          i = (e + 1) % LOG_BASE;
	          if (e < 0) i += LOG_BASE;

	          if (i < len) {
	            if (i) x.c.push(+str.slice(0, i));

	            for (len -= LOG_BASE; i < len;) {
	              x.c.push(+str.slice(i, i += LOG_BASE));
	            }

	            str = str.slice(i);
	            i = LOG_BASE - str.length;
	          } else {
	            i -= len;
	          }

	          for (; i--; str += '0');
	          x.c.push(+str);
	        }
	      } else {

	        // Zero.
	        x.c = [x.e = 0];
	      }
	    }


	    // CONSTRUCTOR PROPERTIES


	    BigNumber.clone = clone;

	    BigNumber.ROUND_UP = 0;
	    BigNumber.ROUND_DOWN = 1;
	    BigNumber.ROUND_CEIL = 2;
	    BigNumber.ROUND_FLOOR = 3;
	    BigNumber.ROUND_HALF_UP = 4;
	    BigNumber.ROUND_HALF_DOWN = 5;
	    BigNumber.ROUND_HALF_EVEN = 6;
	    BigNumber.ROUND_HALF_CEIL = 7;
	    BigNumber.ROUND_HALF_FLOOR = 8;
	    BigNumber.EUCLID = 9;


	    /*
	     * Configure infrequently-changing library-wide settings.
	     *
	     * Accept an object with the following optional properties (if the value of a property is
	     * a number, it must be an integer within the inclusive range stated):
	     *
	     *   DECIMAL_PLACES   {number}           0 to MAX
	     *   ROUNDING_MODE    {number}           0 to 8
	     *   EXPONENTIAL_AT   {number|number[]}  -MAX to MAX  or  [-MAX to 0, 0 to MAX]
	     *   RANGE            {number|number[]}  -MAX to MAX (not zero)  or  [-MAX to -1, 1 to MAX]
	     *   CRYPTO           {boolean}          true or false
	     *   MODULO_MODE      {number}           0 to 9
	     *   POW_PRECISION       {number}           0 to MAX
	     *   ALPHABET         {string}           A string of two or more unique characters which does
	     *                                       not contain '.'.
	     *   FORMAT           {object}           An object with some of the following properties:
	     *     prefix                 {string}
	     *     groupSize              {number}
	     *     secondaryGroupSize     {number}
	     *     groupSeparator         {string}
	     *     decimalSeparator       {string}
	     *     fractionGroupSize      {number}
	     *     fractionGroupSeparator {string}
	     *     suffix                 {string}
	     *
	     * (The values assigned to the above FORMAT object properties are not checked for validity.)
	     *
	     * E.g.
	     * BigNumber.config({ DECIMAL_PLACES : 20, ROUNDING_MODE : 4 })
	     *
	     * Ignore properties/parameters set to null or undefined, except for ALPHABET.
	     *
	     * Return an object with the properties current values.
	     */
	    BigNumber.config = BigNumber.set = function (obj) {
	      var p, v;

	      if (obj != null) {

	        if (typeof obj == 'object') {

	          // DECIMAL_PLACES {number} Integer, 0 to MAX inclusive.
	          // '[BigNumber Error] DECIMAL_PLACES {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'DECIMAL_PLACES')) {
	            v = obj[p];
	            intCheck(v, 0, MAX, p);
	            DECIMAL_PLACES = v;
	          }

	          // ROUNDING_MODE {number} Integer, 0 to 8 inclusive.
	          // '[BigNumber Error] ROUNDING_MODE {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'ROUNDING_MODE')) {
	            v = obj[p];
	            intCheck(v, 0, 8, p);
	            ROUNDING_MODE = v;
	          }

	          // EXPONENTIAL_AT {number|number[]}
	          // Integer, -MAX to MAX inclusive or
	          // [integer -MAX to 0 inclusive, 0 to MAX inclusive].
	          // '[BigNumber Error] EXPONENTIAL_AT {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'EXPONENTIAL_AT')) {
	            v = obj[p];
	            if (v && v.pop) {
	              intCheck(v[0], -MAX, 0, p);
	              intCheck(v[1], 0, MAX, p);
	              TO_EXP_NEG = v[0];
	              TO_EXP_POS = v[1];
	            } else {
	              intCheck(v, -MAX, MAX, p);
	              TO_EXP_NEG = -(TO_EXP_POS = v < 0 ? -v : v);
	            }
	          }

	          // RANGE {number|number[]} Non-zero integer, -MAX to MAX inclusive or
	          // [integer -MAX to -1 inclusive, integer 1 to MAX inclusive].
	          // '[BigNumber Error] RANGE {not a primitive number|not an integer|out of range|cannot be zero}: {v}'
	          if (obj.hasOwnProperty(p = 'RANGE')) {
	            v = obj[p];
	            if (v && v.pop) {
	              intCheck(v[0], -MAX, -1, p);
	              intCheck(v[1], 1, MAX, p);
	              MIN_EXP = v[0];
	              MAX_EXP = v[1];
	            } else {
	              intCheck(v, -MAX, MAX, p);
	              if (v) {
	                MIN_EXP = -(MAX_EXP = v < 0 ? -v : v);
	              } else {
	                throw Error
	                 (bignumberError + p + ' cannot be zero: ' + v);
	              }
	            }
	          }

	          // CRYPTO {boolean} true or false.
	          // '[BigNumber Error] CRYPTO not true or false: {v}'
	          // '[BigNumber Error] crypto unavailable'
	          if (obj.hasOwnProperty(p = 'CRYPTO')) {
	            v = obj[p];
	            if (v === !!v) {
	              if (v) {
	                if (typeof crypto != 'undefined' && crypto &&
	                 (crypto.getRandomValues || crypto.randomBytes)) {
	                  CRYPTO = v;
	                } else {
	                  CRYPTO = !v;
	                  throw Error
	                   (bignumberError + 'crypto unavailable');
	                }
	              } else {
	                CRYPTO = v;
	              }
	            } else {
	              throw Error
	               (bignumberError + p + ' not true or false: ' + v);
	            }
	          }

	          // MODULO_MODE {number} Integer, 0 to 9 inclusive.
	          // '[BigNumber Error] MODULO_MODE {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'MODULO_MODE')) {
	            v = obj[p];
	            intCheck(v, 0, 9, p);
	            MODULO_MODE = v;
	          }

	          // POW_PRECISION {number} Integer, 0 to MAX inclusive.
	          // '[BigNumber Error] POW_PRECISION {not a primitive number|not an integer|out of range}: {v}'
	          if (obj.hasOwnProperty(p = 'POW_PRECISION')) {
	            v = obj[p];
	            intCheck(v, 0, MAX, p);
	            POW_PRECISION = v;
	          }

	          // FORMAT {object}
	          // '[BigNumber Error] FORMAT not an object: {v}'
	          if (obj.hasOwnProperty(p = 'FORMAT')) {
	            v = obj[p];
	            if (typeof v == 'object') FORMAT = v;
	            else throw Error
	             (bignumberError + p + ' not an object: ' + v);
	          }

	          // ALPHABET {string}
	          // '[BigNumber Error] ALPHABET invalid: {v}'
	          if (obj.hasOwnProperty(p = 'ALPHABET')) {
	            v = obj[p];

	            // Disallow if only one character,
	            // or if it contains '+', '-', '.', whitespace, or a repeated character.
	            if (typeof v == 'string' && !/^.$|[+-.\s]|(.).*\1/.test(v)) {
	              ALPHABET = v;
	            } else {
	              throw Error
	               (bignumberError + p + ' invalid: ' + v);
	            }
	          }

	        } else {

	          // '[BigNumber Error] Object expected: {v}'
	          throw Error
	           (bignumberError + 'Object expected: ' + obj);
	        }
	      }

	      return {
	        DECIMAL_PLACES: DECIMAL_PLACES,
	        ROUNDING_MODE: ROUNDING_MODE,
	        EXPONENTIAL_AT: [TO_EXP_NEG, TO_EXP_POS],
	        RANGE: [MIN_EXP, MAX_EXP],
	        CRYPTO: CRYPTO,
	        MODULO_MODE: MODULO_MODE,
	        POW_PRECISION: POW_PRECISION,
	        FORMAT: FORMAT,
	        ALPHABET: ALPHABET
	      };
	    };


	    /*
	     * Return true if v is a BigNumber instance, otherwise return false.
	     *
	     * v {any}
	     */
	    BigNumber.isBigNumber = function (v) {
	      return v instanceof BigNumber || v && v._isBigNumber === true || false;
	    };


	    /*
	     * Return a new BigNumber whose value is the maximum of the arguments.
	     *
	     * arguments {number|string|BigNumber}
	     */
	    BigNumber.maximum = BigNumber.max = function () {
	      return maxOrMin(arguments, P.lt);
	    };


	    /*
	     * Return a new BigNumber whose value is the minimum of the arguments.
	     *
	     * arguments {number|string|BigNumber}
	     */
	    BigNumber.minimum = BigNumber.min = function () {
	      return maxOrMin(arguments, P.gt);
	    };


	    /*
	     * Return a new BigNumber with a random value equal to or greater than 0 and less than 1,
	     * and with dp, or DECIMAL_PLACES if dp is omitted, decimal places (or less if trailing
	     * zeros are produced).
	     *
	     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp}'
	     * '[BigNumber Error] crypto unavailable'
	     */
	    BigNumber.random = (function () {
	      var pow2_53 = 0x20000000000000;

	      // Return a 53 bit integer n, where 0 <= n < 9007199254740992.
	      // Check if Math.random() produces more than 32 bits of randomness.
	      // If it does, assume at least 53 bits are produced, otherwise assume at least 30 bits.
	      // 0x40000000 is 2^30, 0x800000 is 2^23, 0x1fffff is 2^21 - 1.
	      var random53bitInt = (Math.random() * pow2_53) & 0x1fffff
	       ? function () { return mathfloor(Math.random() * pow2_53); }
	       : function () { return ((Math.random() * 0x40000000 | 0) * 0x800000) +
	         (Math.random() * 0x800000 | 0); };

	      return function (dp) {
	        var a, b, e, k, v,
	          i = 0,
	          c = [],
	          rand = new BigNumber(ONE);

	        if (dp == null) dp = DECIMAL_PLACES;
	        else intCheck(dp, 0, MAX);

	        k = mathceil(dp / LOG_BASE);

	        if (CRYPTO) {

	          // Browsers supporting crypto.getRandomValues.
	          if (crypto.getRandomValues) {

	            a = crypto.getRandomValues(new Uint32Array(k *= 2));

	            for (; i < k;) {

	              // 53 bits:
	              // ((Math.pow(2, 32) - 1) * Math.pow(2, 21)).toString(2)
	              // 11111 11111111 11111111 11111111 11100000 00000000 00000000
	              // ((Math.pow(2, 32) - 1) >>> 11).toString(2)
	              //                                     11111 11111111 11111111
	              // 0x20000 is 2^21.
	              v = a[i] * 0x20000 + (a[i + 1] >>> 11);

	              // Rejection sampling:
	              // 0 <= v < 9007199254740992
	              // Probability that v >= 9e15, is
	              // 7199254740992 / 9007199254740992 ~= 0.0008, i.e. 1 in 1251
	              if (v >= 9e15) {
	                b = crypto.getRandomValues(new Uint32Array(2));
	                a[i] = b[0];
	                a[i + 1] = b[1];
	              } else {

	                // 0 <= v <= 8999999999999999
	                // 0 <= (v % 1e14) <= 99999999999999
	                c.push(v % 1e14);
	                i += 2;
	              }
	            }
	            i = k / 2;

	          // Node.js supporting crypto.randomBytes.
	          } else if (crypto.randomBytes) {

	            // buffer
	            a = crypto.randomBytes(k *= 7);

	            for (; i < k;) {

	              // 0x1000000000000 is 2^48, 0x10000000000 is 2^40
	              // 0x100000000 is 2^32, 0x1000000 is 2^24
	              // 11111 11111111 11111111 11111111 11111111 11111111 11111111
	              // 0 <= v < 9007199254740992
	              v = ((a[i] & 31) * 0x1000000000000) + (a[i + 1] * 0x10000000000) +
	                 (a[i + 2] * 0x100000000) + (a[i + 3] * 0x1000000) +
	                 (a[i + 4] << 16) + (a[i + 5] << 8) + a[i + 6];

	              if (v >= 9e15) {
	                crypto.randomBytes(7).copy(a, i);
	              } else {

	                // 0 <= (v % 1e14) <= 99999999999999
	                c.push(v % 1e14);
	                i += 7;
	              }
	            }
	            i = k / 7;
	          } else {
	            CRYPTO = false;
	            throw Error
	             (bignumberError + 'crypto unavailable');
	          }
	        }

	        // Use Math.random.
	        if (!CRYPTO) {

	          for (; i < k;) {
	            v = random53bitInt();
	            if (v < 9e15) c[i++] = v % 1e14;
	          }
	        }

	        k = c[--i];
	        dp %= LOG_BASE;

	        // Convert trailing digits to zeros according to dp.
	        if (k && dp) {
	          v = POWS_TEN[LOG_BASE - dp];
	          c[i] = mathfloor(k / v) * v;
	        }

	        // Remove trailing elements which are zero.
	        for (; c[i] === 0; c.pop(), i--);

	        // Zero?
	        if (i < 0) {
	          c = [e = 0];
	        } else {

	          // Remove leading elements which are zero and adjust exponent accordingly.
	          for (e = -1 ; c[0] === 0; c.splice(0, 1), e -= LOG_BASE);

	          // Count the digits of the first element of c to determine leading zeros, and...
	          for (i = 1, v = c[0]; v >= 10; v /= 10, i++);

	          // adjust the exponent accordingly.
	          if (i < LOG_BASE) e -= LOG_BASE - i;
	        }

	        rand.e = e;
	        rand.c = c;
	        return rand;
	      };
	    })();


	    /*
	     * Return a BigNumber whose value is the sum of the arguments.
	     *
	     * arguments {number|string|BigNumber}
	     */
	    BigNumber.sum = function () {
	      var i = 1,
	        args = arguments,
	        sum = new BigNumber(args[0]);
	      for (; i < args.length;) sum = sum.plus(args[i++]);
	      return sum;
	    };


	    // PRIVATE FUNCTIONS


	    // Called by BigNumber and BigNumber.prototype.toString.
	    convertBase = (function () {
	      var decimal = '0123456789';

	      /*
	       * Convert string of baseIn to an array of numbers of baseOut.
	       * Eg. toBaseOut('255', 10, 16) returns [15, 15].
	       * Eg. toBaseOut('ff', 16, 10) returns [2, 5, 5].
	       */
	      function toBaseOut(str, baseIn, baseOut, alphabet) {
	        var j,
	          arr = [0],
	          arrL,
	          i = 0,
	          len = str.length;

	        for (; i < len;) {
	          for (arrL = arr.length; arrL--; arr[arrL] *= baseIn);

	          arr[0] += alphabet.indexOf(str.charAt(i++));

	          for (j = 0; j < arr.length; j++) {

	            if (arr[j] > baseOut - 1) {
	              if (arr[j + 1] == null) arr[j + 1] = 0;
	              arr[j + 1] += arr[j] / baseOut | 0;
	              arr[j] %= baseOut;
	            }
	          }
	        }

	        return arr.reverse();
	      }

	      // Convert a numeric string of baseIn to a numeric string of baseOut.
	      // If the caller is toString, we are converting from base 10 to baseOut.
	      // If the caller is BigNumber, we are converting from baseIn to base 10.
	      return function (str, baseIn, baseOut, sign, callerIsToString) {
	        var alphabet, d, e, k, r, x, xc, y,
	          i = str.indexOf('.'),
	          dp = DECIMAL_PLACES,
	          rm = ROUNDING_MODE;

	        // Non-integer.
	        if (i >= 0) {
	          k = POW_PRECISION;

	          // Unlimited precision.
	          POW_PRECISION = 0;
	          str = str.replace('.', '');
	          y = new BigNumber(baseIn);
	          x = y.pow(str.length - i);
	          POW_PRECISION = k;

	          // Convert str as if an integer, then restore the fraction part by dividing the
	          // result by its base raised to a power.

	          y.c = toBaseOut(toFixedPoint(coeffToString(x.c), x.e, '0'),
	           10, baseOut, decimal);
	          y.e = y.c.length;
	        }

	        // Convert the number as integer.

	        xc = toBaseOut(str, baseIn, baseOut, callerIsToString
	         ? (alphabet = ALPHABET, decimal)
	         : (alphabet = decimal, ALPHABET));

	        // xc now represents str as an integer and converted to baseOut. e is the exponent.
	        e = k = xc.length;

	        // Remove trailing zeros.
	        for (; xc[--k] == 0; xc.pop());

	        // Zero?
	        if (!xc[0]) return alphabet.charAt(0);

	        // Does str represent an integer? If so, no need for the division.
	        if (i < 0) {
	          --e;
	        } else {
	          x.c = xc;
	          x.e = e;

	          // The sign is needed for correct rounding.
	          x.s = sign;
	          x = div(x, y, dp, rm, baseOut);
	          xc = x.c;
	          r = x.r;
	          e = x.e;
	        }

	        // xc now represents str converted to baseOut.

	        // THe index of the rounding digit.
	        d = e + dp + 1;

	        // The rounding digit: the digit to the right of the digit that may be rounded up.
	        i = xc[d];

	        // Look at the rounding digits and mode to determine whether to round up.

	        k = baseOut / 2;
	        r = r || d < 0 || xc[d + 1] != null;

	        r = rm < 4 ? (i != null || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
	              : i > k || i == k &&(rm == 4 || r || rm == 6 && xc[d - 1] & 1 ||
	               rm == (x.s < 0 ? 8 : 7));

	        // If the index of the rounding digit is not greater than zero, or xc represents
	        // zero, then the result of the base conversion is zero or, if rounding up, a value
	        // such as 0.00001.
	        if (d < 1 || !xc[0]) {

	          // 1^-dp or 0
	          str = r ? toFixedPoint(alphabet.charAt(1), -dp, alphabet.charAt(0)) : alphabet.charAt(0);
	        } else {

	          // Truncate xc to the required number of decimal places.
	          xc.length = d;

	          // Round up?
	          if (r) {

	            // Rounding up may mean the previous digit has to be rounded up and so on.
	            for (--baseOut; ++xc[--d] > baseOut;) {
	              xc[d] = 0;

	              if (!d) {
	                ++e;
	                xc = [1].concat(xc);
	              }
	            }
	          }

	          // Determine trailing zeros.
	          for (k = xc.length; !xc[--k];);

	          // E.g. [4, 11, 15] becomes 4bf.
	          for (i = 0, str = ''; i <= k; str += alphabet.charAt(xc[i++]));

	          // Add leading zeros, decimal point and trailing zeros as required.
	          str = toFixedPoint(str, e, alphabet.charAt(0));
	        }

	        // The caller will add the sign.
	        return str;
	      };
	    })();


	    // Perform division in the specified base. Called by div and convertBase.
	    div = (function () {

	      // Assume non-zero x and k.
	      function multiply(x, k, base) {
	        var m, temp, xlo, xhi,
	          carry = 0,
	          i = x.length,
	          klo = k % SQRT_BASE,
	          khi = k / SQRT_BASE | 0;

	        for (x = x.slice(); i--;) {
	          xlo = x[i] % SQRT_BASE;
	          xhi = x[i] / SQRT_BASE | 0;
	          m = khi * xlo + xhi * klo;
	          temp = klo * xlo + ((m % SQRT_BASE) * SQRT_BASE) + carry;
	          carry = (temp / base | 0) + (m / SQRT_BASE | 0) + khi * xhi;
	          x[i] = temp % base;
	        }

	        if (carry) x = [carry].concat(x);

	        return x;
	      }

	      function compare(a, b, aL, bL) {
	        var i, cmp;

	        if (aL != bL) {
	          cmp = aL > bL ? 1 : -1;
	        } else {

	          for (i = cmp = 0; i < aL; i++) {

	            if (a[i] != b[i]) {
	              cmp = a[i] > b[i] ? 1 : -1;
	              break;
	            }
	          }
	        }

	        return cmp;
	      }

	      function subtract(a, b, aL, base) {
	        var i = 0;

	        // Subtract b from a.
	        for (; aL--;) {
	          a[aL] -= i;
	          i = a[aL] < b[aL] ? 1 : 0;
	          a[aL] = i * base + a[aL] - b[aL];
	        }

	        // Remove leading zeros.
	        for (; !a[0] && a.length > 1; a.splice(0, 1));
	      }

	      // x: dividend, y: divisor.
	      return function (x, y, dp, rm, base) {
	        var cmp, e, i, more, n, prod, prodL, q, qc, rem, remL, rem0, xi, xL, yc0,
	          yL, yz,
	          s = x.s == y.s ? 1 : -1,
	          xc = x.c,
	          yc = y.c;

	        // Either NaN, Infinity or 0?
	        if (!xc || !xc[0] || !yc || !yc[0]) {

	          return new BigNumber(

	           // Return NaN if either NaN, or both Infinity or 0.
	           !x.s || !y.s || (xc ? yc && xc[0] == yc[0] : !yc) ? NaN :

	            // Return Â±0 if x is Â±0 or y is Â±Infinity, or return Â±Infinity as y is Â±0.
	            xc && xc[0] == 0 || !yc ? s * 0 : s / 0
	         );
	        }

	        q = new BigNumber(s);
	        qc = q.c = [];
	        e = x.e - y.e;
	        s = dp + e + 1;

	        if (!base) {
	          base = BASE;
	          e = bitFloor(x.e / LOG_BASE) - bitFloor(y.e / LOG_BASE);
	          s = s / LOG_BASE | 0;
	        }

	        // Result exponent may be one less then the current value of e.
	        // The coefficients of the BigNumbers from convertBase may have trailing zeros.
	        for (i = 0; yc[i] == (xc[i] || 0); i++);

	        if (yc[i] > (xc[i] || 0)) e--;

	        if (s < 0) {
	          qc.push(1);
	          more = true;
	        } else {
	          xL = xc.length;
	          yL = yc.length;
	          i = 0;
	          s += 2;

	          // Normalise xc and yc so highest order digit of yc is >= base / 2.

	          n = mathfloor(base / (yc[0] + 1));

	          // Not necessary, but to handle odd bases where yc[0] == (base / 2) - 1.
	          // if (n > 1 || n++ == 1 && yc[0] < base / 2) {
	          if (n > 1) {
	            yc = multiply(yc, n, base);
	            xc = multiply(xc, n, base);
	            yL = yc.length;
	            xL = xc.length;
	          }

	          xi = yL;
	          rem = xc.slice(0, yL);
	          remL = rem.length;

	          // Add zeros to make remainder as long as divisor.
	          for (; remL < yL; rem[remL++] = 0);
	          yz = yc.slice();
	          yz = [0].concat(yz);
	          yc0 = yc[0];
	          if (yc[1] >= base / 2) yc0++;
	          // Not necessary, but to prevent trial digit n > base, when using base 3.
	          // else if (base == 3 && yc0 == 1) yc0 = 1 + 1e-15;

	          do {
	            n = 0;

	            // Compare divisor and remainder.
	            cmp = compare(yc, rem, yL, remL);

	            // If divisor < remainder.
	            if (cmp < 0) {

	              // Calculate trial digit, n.

	              rem0 = rem[0];
	              if (yL != remL) rem0 = rem0 * base + (rem[1] || 0);

	              // n is how many times the divisor goes into the current remainder.
	              n = mathfloor(rem0 / yc0);

	              //  Algorithm:
	              //  product = divisor multiplied by trial digit (n).
	              //  Compare product and remainder.
	              //  If product is greater than remainder:
	              //    Subtract divisor from product, decrement trial digit.
	              //  Subtract product from remainder.
	              //  If product was less than remainder at the last compare:
	              //    Compare new remainder and divisor.
	              //    If remainder is greater than divisor:
	              //      Subtract divisor from remainder, increment trial digit.

	              if (n > 1) {

	                // n may be > base only when base is 3.
	                if (n >= base) n = base - 1;

	                // product = divisor * trial digit.
	                prod = multiply(yc, n, base);
	                prodL = prod.length;
	                remL = rem.length;

	                // Compare product and remainder.
	                // If product > remainder then trial digit n too high.
	                // n is 1 too high about 5% of the time, and is not known to have
	                // ever been more than 1 too high.
	                while (compare(prod, rem, prodL, remL) == 1) {
	                  n--;

	                  // Subtract divisor from product.
	                  subtract(prod, yL < prodL ? yz : yc, prodL, base);
	                  prodL = prod.length;
	                  cmp = 1;
	                }
	              } else {

	                // n is 0 or 1, cmp is -1.
	                // If n is 0, there is no need to compare yc and rem again below,
	                // so change cmp to 1 to avoid it.
	                // If n is 1, leave cmp as -1, so yc and rem are compared again.
	                if (n == 0) {

	                  // divisor < remainder, so n must be at least 1.
	                  cmp = n = 1;
	                }

	                // product = divisor
	                prod = yc.slice();
	                prodL = prod.length;
	              }

	              if (prodL < remL) prod = [0].concat(prod);

	              // Subtract product from remainder.
	              subtract(rem, prod, remL, base);
	              remL = rem.length;

	               // If product was < remainder.
	              if (cmp == -1) {

	                // Compare divisor and new remainder.
	                // If divisor < new remainder, subtract divisor from remainder.
	                // Trial digit n too low.
	                // n is 1 too low about 5% of the time, and very rarely 2 too low.
	                while (compare(yc, rem, yL, remL) < 1) {
	                  n++;

	                  // Subtract divisor from remainder.
	                  subtract(rem, yL < remL ? yz : yc, remL, base);
	                  remL = rem.length;
	                }
	              }
	            } else if (cmp === 0) {
	              n++;
	              rem = [0];
	            } // else cmp === 1 and n will be 0

	            // Add the next digit, n, to the result array.
	            qc[i++] = n;

	            // Update the remainder.
	            if (rem[0]) {
	              rem[remL++] = xc[xi] || 0;
	            } else {
	              rem = [xc[xi]];
	              remL = 1;
	            }
	          } while ((xi++ < xL || rem[0] != null) && s--);

	          more = rem[0] != null;

	          // Leading zero?
	          if (!qc[0]) qc.splice(0, 1);
	        }

	        if (base == BASE) {

	          // To calculate q.e, first get the number of digits of qc[0].
	          for (i = 1, s = qc[0]; s >= 10; s /= 10, i++);

	          round(q, dp + (q.e = i + e * LOG_BASE - 1) + 1, rm, more);

	        // Caller is convertBase.
	        } else {
	          q.e = e;
	          q.r = +more;
	        }

	        return q;
	      };
	    })();


	    /*
	     * Return a string representing the value of BigNumber n in fixed-point or exponential
	     * notation rounded to the specified decimal places or significant digits.
	     *
	     * n: a BigNumber.
	     * i: the index of the last digit required (i.e. the digit that may be rounded up).
	     * rm: the rounding mode.
	     * id: 1 (toExponential) or 2 (toPrecision).
	     */
	    function format(n, i, rm, id) {
	      var c0, e, ne, len, str;

	      if (rm == null) rm = ROUNDING_MODE;
	      else intCheck(rm, 0, 8);

	      if (!n.c) return n.toString();

	      c0 = n.c[0];
	      ne = n.e;

	      if (i == null) {
	        str = coeffToString(n.c);
	        str = id == 1 || id == 2 && ne <= TO_EXP_NEG
	         ? toExponential(str, ne)
	         : toFixedPoint(str, ne, '0');
	      } else {
	        n = round(new BigNumber(n), i, rm);

	        // n.e may have changed if the value was rounded up.
	        e = n.e;

	        str = coeffToString(n.c);
	        len = str.length;

	        // toPrecision returns exponential notation if the number of significant digits
	        // specified is less than the number of digits necessary to represent the integer
	        // part of the value in fixed-point notation.

	        // Exponential notation.
	        if (id == 1 || id == 2 && (i <= e || e <= TO_EXP_NEG)) {

	          // Append zeros?
	          for (; len < i; str += '0', len++);
	          str = toExponential(str, e);

	        // Fixed-point notation.
	        } else {
	          i -= ne;
	          str = toFixedPoint(str, e, '0');

	          // Append zeros?
	          if (e + 1 > len) {
	            if (--i > 0) for (str += '.'; i--; str += '0');
	          } else {
	            i += e - len;
	            if (i > 0) {
	              if (e + 1 == len) str += '.';
	              for (; i--; str += '0');
	            }
	          }
	        }
	      }

	      return n.s < 0 && c0 ? '-' + str : str;
	    }


	    // Handle BigNumber.max and BigNumber.min.
	    function maxOrMin(args, method) {
	      var n,
	        i = 1,
	        m = new BigNumber(args[0]);

	      for (; i < args.length; i++) {
	        n = new BigNumber(args[i]);

	        // If any number is NaN, return NaN.
	        if (!n.s) {
	          m = n;
	          break;
	        } else if (method.call(m, n)) {
	          m = n;
	        }
	      }

	      return m;
	    }


	    /*
	     * Strip trailing zeros, calculate base 10 exponent and check against MIN_EXP and MAX_EXP.
	     * Called by minus, plus and times.
	     */
	    function normalise(n, c, e) {
	      var i = 1,
	        j = c.length;

	       // Remove trailing zeros.
	      for (; !c[--j]; c.pop());

	      // Calculate the base 10 exponent. First get the number of digits of c[0].
	      for (j = c[0]; j >= 10; j /= 10, i++);

	      // Overflow?
	      if ((e = i + e * LOG_BASE - 1) > MAX_EXP) {

	        // Infinity.
	        n.c = n.e = null;

	      // Underflow?
	      } else if (e < MIN_EXP) {

	        // Zero.
	        n.c = [n.e = 0];
	      } else {
	        n.e = e;
	        n.c = c;
	      }

	      return n;
	    }


	    // Handle values that fail the validity test in BigNumber.
	    parseNumeric = (function () {
	      var basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i,
	        dotAfter = /^([^.]+)\.$/,
	        dotBefore = /^\.([^.]+)$/,
	        isInfinityOrNaN = /^-?(Infinity|NaN)$/,
	        whitespaceOrPlus = /^\s*\+(?=[\w.])|^\s+|\s+$/g;

	      return function (x, str, isNum, b) {
	        var base,
	          s = isNum ? str : str.replace(whitespaceOrPlus, '');

	        // No exception on Â±Infinity or NaN.
	        if (isInfinityOrNaN.test(s)) {
	          x.s = isNaN(s) ? null : s < 0 ? -1 : 1;
	          x.c = x.e = null;
	        } else {
	          if (!isNum) {

	            // basePrefix = /^(-?)0([xbo])(?=\w[\w.]*$)/i
	            s = s.replace(basePrefix, function (m, p1, p2) {
	              base = (p2 = p2.toLowerCase()) == 'x' ? 16 : p2 == 'b' ? 2 : 8;
	              return !b || b == base ? p1 : m;
	            });

	            if (b) {
	              base = b;

	              // E.g. '1.' to '1', '.1' to '0.1'
	              s = s.replace(dotAfter, '$1').replace(dotBefore, '0.$1');
	            }

	            if (str != s) return new BigNumber(s, base);
	          }

	          // '[BigNumber Error] Not a number: {n}'
	          // '[BigNumber Error] Not a base {b} number: {n}'
	          if (BigNumber.DEBUG) {
	            throw Error
	              (bignumberError + 'Not a' + (b ? ' base ' + b : '') + ' number: ' + str);
	          }

	          // NaN
	          x.c = x.e = x.s = null;
	        }
	      }
	    })();


	    /*
	     * Round x to sd significant digits using rounding mode rm. Check for over/under-flow.
	     * If r is truthy, it is known that there are more digits after the rounding digit.
	     */
	    function round(x, sd, rm, r) {
	      var d, i, j, k, n, ni, rd,
	        xc = x.c,
	        pows10 = POWS_TEN;

	      // if x is not Infinity or NaN...
	      if (xc) {

	        // rd is the rounding digit, i.e. the digit after the digit that may be rounded up.
	        // n is a base 1e14 number, the value of the element of array x.c containing rd.
	        // ni is the index of n within x.c.
	        // d is the number of digits of n.
	        // i is the index of rd within n including leading zeros.
	        // j is the actual index of rd within n (if < 0, rd is a leading zero).
	        out: {

	          // Get the number of digits of the first element of xc.
	          for (d = 1, k = xc[0]; k >= 10; k /= 10, d++);
	          i = sd - d;

	          // If the rounding digit is in the first element of xc...
	          if (i < 0) {
	            i += LOG_BASE;
	            j = sd;
	            n = xc[ni = 0];

	            // Get the rounding digit at index j of n.
	            rd = n / pows10[d - j - 1] % 10 | 0;
	          } else {
	            ni = mathceil((i + 1) / LOG_BASE);

	            if (ni >= xc.length) {

	              if (r) {

	                // Needed by sqrt.
	                for (; xc.length <= ni; xc.push(0));
	                n = rd = 0;
	                d = 1;
	                i %= LOG_BASE;
	                j = i - LOG_BASE + 1;
	              } else {
	                break out;
	              }
	            } else {
	              n = k = xc[ni];

	              // Get the number of digits of n.
	              for (d = 1; k >= 10; k /= 10, d++);

	              // Get the index of rd within n.
	              i %= LOG_BASE;

	              // Get the index of rd within n, adjusted for leading zeros.
	              // The number of leading zeros of n is given by LOG_BASE - d.
	              j = i - LOG_BASE + d;

	              // Get the rounding digit at index j of n.
	              rd = j < 0 ? 0 : n / pows10[d - j - 1] % 10 | 0;
	            }
	          }

	          r = r || sd < 0 ||

	          // Are there any non-zero digits after the rounding digit?
	          // The expression  n % pows10[d - j - 1]  returns all digits of n to the right
	          // of the digit at j, e.g. if n is 908714 and j is 2, the expression gives 714.
	           xc[ni + 1] != null || (j < 0 ? n : n % pows10[d - j - 1]);

	          r = rm < 4
	           ? (rd || r) && (rm == 0 || rm == (x.s < 0 ? 3 : 2))
	           : rd > 5 || rd == 5 && (rm == 4 || r || rm == 6 &&

	            // Check whether the digit to the left of the rounding digit is odd.
	            ((i > 0 ? j > 0 ? n / pows10[d - j] : 0 : xc[ni - 1]) % 10) & 1 ||
	             rm == (x.s < 0 ? 8 : 7));

	          if (sd < 1 || !xc[0]) {
	            xc.length = 0;

	            if (r) {

	              // Convert sd to decimal places.
	              sd -= x.e + 1;

	              // 1, 0.1, 0.01, 0.001, 0.0001 etc.
	              xc[0] = pows10[(LOG_BASE - sd % LOG_BASE) % LOG_BASE];
	              x.e = -sd || 0;
	            } else {

	              // Zero.
	              xc[0] = x.e = 0;
	            }

	            return x;
	          }

	          // Remove excess digits.
	          if (i == 0) {
	            xc.length = ni;
	            k = 1;
	            ni--;
	          } else {
	            xc.length = ni + 1;
	            k = pows10[LOG_BASE - i];

	            // E.g. 56700 becomes 56000 if 7 is the rounding digit.
	            // j > 0 means i > number of leading zeros of n.
	            xc[ni] = j > 0 ? mathfloor(n / pows10[d - j] % pows10[j]) * k : 0;
	          }

	          // Round up?
	          if (r) {

	            for (; ;) {

	              // If the digit to be rounded up is in the first element of xc...
	              if (ni == 0) {

	                // i will be the length of xc[0] before k is added.
	                for (i = 1, j = xc[0]; j >= 10; j /= 10, i++);
	                j = xc[0] += k;
	                for (k = 1; j >= 10; j /= 10, k++);

	                // if i != k the length has increased.
	                if (i != k) {
	                  x.e++;
	                  if (xc[0] == BASE) xc[0] = 1;
	                }

	                break;
	              } else {
	                xc[ni] += k;
	                if (xc[ni] != BASE) break;
	                xc[ni--] = 0;
	                k = 1;
	              }
	            }
	          }

	          // Remove trailing zeros.
	          for (i = xc.length; xc[--i] === 0; xc.pop());
	        }

	        // Overflow? Infinity.
	        if (x.e > MAX_EXP) {
	          x.c = x.e = null;

	        // Underflow? Zero.
	        } else if (x.e < MIN_EXP) {
	          x.c = [x.e = 0];
	        }
	      }

	      return x;
	    }


	    function valueOf(n) {
	      var str,
	        e = n.e;

	      if (e === null) return n.toString();

	      str = coeffToString(n.c);

	      str = e <= TO_EXP_NEG || e >= TO_EXP_POS
	        ? toExponential(str, e)
	        : toFixedPoint(str, e, '0');

	      return n.s < 0 ? '-' + str : str;
	    }


	    // PROTOTYPE/INSTANCE METHODS


	    /*
	     * Return a new BigNumber whose value is the absolute value of this BigNumber.
	     */
	    P.absoluteValue = P.abs = function () {
	      var x = new BigNumber(this);
	      if (x.s < 0) x.s = 1;
	      return x;
	    };


	    /*
	     * Return
	     *   1 if the value of this BigNumber is greater than the value of BigNumber(y, b),
	     *   -1 if the value of this BigNumber is less than the value of BigNumber(y, b),
	     *   0 if they have the same value,
	     *   or null if the value of either is NaN.
	     */
	    P.comparedTo = function (y, b) {
	      return compare(this, new BigNumber(y, b));
	    };


	    /*
	     * If dp is undefined or null or true or false, return the number of decimal places of the
	     * value of this BigNumber, or null if the value of this BigNumber is Â±Infinity or NaN.
	     *
	     * Otherwise, if dp is a number, return a new BigNumber whose value is the value of this
	     * BigNumber rounded to a maximum of dp decimal places using rounding mode rm, or
	     * ROUNDING_MODE if rm is omitted.
	     *
	     * [dp] {number} Decimal places: integer, 0 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
	     */
	    P.decimalPlaces = P.dp = function (dp, rm) {
	      var c, n, v,
	        x = this;

	      if (dp != null) {
	        intCheck(dp, 0, MAX);
	        if (rm == null) rm = ROUNDING_MODE;
	        else intCheck(rm, 0, 8);

	        return round(new BigNumber(x), dp + x.e + 1, rm);
	      }

	      if (!(c = x.c)) return null;
	      n = ((v = c.length - 1) - bitFloor(this.e / LOG_BASE)) * LOG_BASE;

	      // Subtract the number of trailing zeros of the last number.
	      if (v = c[v]) for (; v % 10 == 0; v /= 10, n--);
	      if (n < 0) n = 0;

	      return n;
	    };


	    /*
	     *  n / 0 = I
	     *  n / N = N
	     *  n / I = 0
	     *  0 / n = 0
	     *  0 / 0 = N
	     *  0 / N = N
	     *  0 / I = 0
	     *  N / n = N
	     *  N / 0 = N
	     *  N / N = N
	     *  N / I = N
	     *  I / n = I
	     *  I / 0 = I
	     *  I / N = N
	     *  I / I = N
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber divided by the value of
	     * BigNumber(y, b), rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	     */
	    P.dividedBy = P.div = function (y, b) {
	      return div(this, new BigNumber(y, b), DECIMAL_PLACES, ROUNDING_MODE);
	    };


	    /*
	     * Return a new BigNumber whose value is the integer part of dividing the value of this
	     * BigNumber by the value of BigNumber(y, b).
	     */
	    P.dividedToIntegerBy = P.idiv = function (y, b) {
	      return div(this, new BigNumber(y, b), 0, 1);
	    };


	    /*
	     * Return a BigNumber whose value is the value of this BigNumber exponentiated by n.
	     *
	     * If m is present, return the result modulo m.
	     * If n is negative round according to DECIMAL_PLACES and ROUNDING_MODE.
	     * If POW_PRECISION is non-zero and m is not present, round to POW_PRECISION using ROUNDING_MODE.
	     *
	     * The modular power operation works efficiently when x, n, and m are integers, otherwise it
	     * is equivalent to calculating x.exponentiatedBy(n).modulo(m) with a POW_PRECISION of 0.
	     *
	     * n {number|string|BigNumber} The exponent. An integer.
	     * [m] {number|string|BigNumber} The modulus.
	     *
	     * '[BigNumber Error] Exponent not an integer: {n}'
	     */
	    P.exponentiatedBy = P.pow = function (n, m) {
	      var half, isModExp, i, k, more, nIsBig, nIsNeg, nIsOdd, y,
	        x = this;

	      n = new BigNumber(n);

	      // Allow NaN and Â±Infinity, but not other non-integers.
	      if (n.c && !n.isInteger()) {
	        throw Error
	          (bignumberError + 'Exponent not an integer: ' + valueOf(n));
	      }

	      if (m != null) m = new BigNumber(m);

	      // Exponent of MAX_SAFE_INTEGER is 15.
	      nIsBig = n.e > 14;

	      // If x is NaN, Â±Infinity, Â±0 or Â±1, or n is Â±Infinity, NaN or Â±0.
	      if (!x.c || !x.c[0] || x.c[0] == 1 && !x.e && x.c.length == 1 || !n.c || !n.c[0]) {

	        // The sign of the result of pow when x is negative depends on the evenness of n.
	        // If +n overflows to Â±Infinity, the evenness of n would be not be known.
	        y = new BigNumber(Math.pow(+valueOf(x), nIsBig ? 2 - isOdd(n) : +valueOf(n)));
	        return m ? y.mod(m) : y;
	      }

	      nIsNeg = n.s < 0;

	      if (m) {

	        // x % m returns NaN if abs(m) is zero, or m is NaN.
	        if (m.c ? !m.c[0] : !m.s) return new BigNumber(NaN);

	        isModExp = !nIsNeg && x.isInteger() && m.isInteger();

	        if (isModExp) x = x.mod(m);

	      // Overflow to Â±Infinity: >=2**1e10 or >=1.0000024**1e15.
	      // Underflow to Â±0: <=0.79**1e10 or <=0.9999975**1e15.
	      } else if (n.e > 9 && (x.e > 0 || x.e < -1 || (x.e == 0
	        // [1, 240000000]
	        ? x.c[0] > 1 || nIsBig && x.c[1] >= 24e7
	        // [80000000000000]  [99999750000000]
	        : x.c[0] < 8e13 || nIsBig && x.c[0] <= 9999975e7))) {

	        // If x is negative and n is odd, k = -0, else k = 0.
	        k = x.s < 0 && isOdd(n) ? -0 : 0;

	        // If x >= 1, k = Â±Infinity.
	        if (x.e > -1) k = 1 / k;

	        // If n is negative return Â±0, else return Â±Infinity.
	        return new BigNumber(nIsNeg ? 1 / k : k);

	      } else if (POW_PRECISION) {

	        // Truncating each coefficient array to a length of k after each multiplication
	        // equates to truncating significant digits to POW_PRECISION + [28, 41],
	        // i.e. there will be a minimum of 28 guard digits retained.
	        k = mathceil(POW_PRECISION / LOG_BASE + 2);
	      }

	      if (nIsBig) {
	        half = new BigNumber(0.5);
	        if (nIsNeg) n.s = 1;
	        nIsOdd = isOdd(n);
	      } else {
	        i = Math.abs(+valueOf(n));
	        nIsOdd = i % 2;
	      }

	      y = new BigNumber(ONE);

	      // Performs 54 loop iterations for n of 9007199254740991.
	      for (; ;) {

	        if (nIsOdd) {
	          y = y.times(x);
	          if (!y.c) break;

	          if (k) {
	            if (y.c.length > k) y.c.length = k;
	          } else if (isModExp) {
	            y = y.mod(m);    //y = y.minus(div(y, m, 0, MODULO_MODE).times(m));
	          }
	        }

	        if (i) {
	          i = mathfloor(i / 2);
	          if (i === 0) break;
	          nIsOdd = i % 2;
	        } else {
	          n = n.times(half);
	          round(n, n.e + 1, 1);

	          if (n.e > 14) {
	            nIsOdd = isOdd(n);
	          } else {
	            i = +valueOf(n);
	            if (i === 0) break;
	            nIsOdd = i % 2;
	          }
	        }

	        x = x.times(x);

	        if (k) {
	          if (x.c && x.c.length > k) x.c.length = k;
	        } else if (isModExp) {
	          x = x.mod(m);    //x = x.minus(div(x, m, 0, MODULO_MODE).times(m));
	        }
	      }

	      if (isModExp) return y;
	      if (nIsNeg) y = ONE.div(y);

	      return m ? y.mod(m) : k ? round(y, POW_PRECISION, ROUNDING_MODE, more) : y;
	    };


	    /*
	     * Return a new BigNumber whose value is the value of this BigNumber rounded to an integer
	     * using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	     *
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {rm}'
	     */
	    P.integerValue = function (rm) {
	      var n = new BigNumber(this);
	      if (rm == null) rm = ROUNDING_MODE;
	      else intCheck(rm, 0, 8);
	      return round(n, n.e + 1, rm);
	    };


	    /*
	     * Return true if the value of this BigNumber is equal to the value of BigNumber(y, b),
	     * otherwise return false.
	     */
	    P.isEqualTo = P.eq = function (y, b) {
	      return compare(this, new BigNumber(y, b)) === 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is a finite number, otherwise return false.
	     */
	    P.isFinite = function () {
	      return !!this.c;
	    };


	    /*
	     * Return true if the value of this BigNumber is greater than the value of BigNumber(y, b),
	     * otherwise return false.
	     */
	    P.isGreaterThan = P.gt = function (y, b) {
	      return compare(this, new BigNumber(y, b)) > 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is greater than or equal to the value of
	     * BigNumber(y, b), otherwise return false.
	     */
	    P.isGreaterThanOrEqualTo = P.gte = function (y, b) {
	      return (b = compare(this, new BigNumber(y, b))) === 1 || b === 0;

	    };


	    /*
	     * Return true if the value of this BigNumber is an integer, otherwise return false.
	     */
	    P.isInteger = function () {
	      return !!this.c && bitFloor(this.e / LOG_BASE) > this.c.length - 2;
	    };


	    /*
	     * Return true if the value of this BigNumber is less than the value of BigNumber(y, b),
	     * otherwise return false.
	     */
	    P.isLessThan = P.lt = function (y, b) {
	      return compare(this, new BigNumber(y, b)) < 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is less than or equal to the value of
	     * BigNumber(y, b), otherwise return false.
	     */
	    P.isLessThanOrEqualTo = P.lte = function (y, b) {
	      return (b = compare(this, new BigNumber(y, b))) === -1 || b === 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is NaN, otherwise return false.
	     */
	    P.isNaN = function () {
	      return !this.s;
	    };


	    /*
	     * Return true if the value of this BigNumber is negative, otherwise return false.
	     */
	    P.isNegative = function () {
	      return this.s < 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is positive, otherwise return false.
	     */
	    P.isPositive = function () {
	      return this.s > 0;
	    };


	    /*
	     * Return true if the value of this BigNumber is 0 or -0, otherwise return false.
	     */
	    P.isZero = function () {
	      return !!this.c && this.c[0] == 0;
	    };


	    /*
	     *  n - 0 = n
	     *  n - N = N
	     *  n - I = -I
	     *  0 - n = -n
	     *  0 - 0 = 0
	     *  0 - N = N
	     *  0 - I = -I
	     *  N - n = N
	     *  N - 0 = N
	     *  N - N = N
	     *  N - I = N
	     *  I - n = I
	     *  I - 0 = I
	     *  I - N = N
	     *  I - I = N
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber minus the value of
	     * BigNumber(y, b).
	     */
	    P.minus = function (y, b) {
	      var i, j, t, xLTy,
	        x = this,
	        a = x.s;

	      y = new BigNumber(y, b);
	      b = y.s;

	      // Either NaN?
	      if (!a || !b) return new BigNumber(NaN);

	      // Signs differ?
	      if (a != b) {
	        y.s = -b;
	        return x.plus(y);
	      }

	      var xe = x.e / LOG_BASE,
	        ye = y.e / LOG_BASE,
	        xc = x.c,
	        yc = y.c;

	      if (!xe || !ye) {

	        // Either Infinity?
	        if (!xc || !yc) return xc ? (y.s = -b, y) : new BigNumber(yc ? x : NaN);

	        // Either zero?
	        if (!xc[0] || !yc[0]) {

	          // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	          return yc[0] ? (y.s = -b, y) : new BigNumber(xc[0] ? x :

	           // IEEE 754 (2008) 6.3: n - n = -0 when rounding to -Infinity
	           ROUNDING_MODE == 3 ? -0 : 0);
	        }
	      }

	      xe = bitFloor(xe);
	      ye = bitFloor(ye);
	      xc = xc.slice();

	      // Determine which is the bigger number.
	      if (a = xe - ye) {

	        if (xLTy = a < 0) {
	          a = -a;
	          t = xc;
	        } else {
	          ye = xe;
	          t = yc;
	        }

	        t.reverse();

	        // Prepend zeros to equalise exponents.
	        for (b = a; b--; t.push(0));
	        t.reverse();
	      } else {

	        // Exponents equal. Check digit by digit.
	        j = (xLTy = (a = xc.length) < (b = yc.length)) ? a : b;

	        for (a = b = 0; b < j; b++) {

	          if (xc[b] != yc[b]) {
	            xLTy = xc[b] < yc[b];
	            break;
	          }
	        }
	      }

	      // x < y? Point xc to the array of the bigger number.
	      if (xLTy) t = xc, xc = yc, yc = t, y.s = -y.s;

	      b = (j = yc.length) - (i = xc.length);

	      // Append zeros to xc if shorter.
	      // No need to add zeros to yc if shorter as subtract only needs to start at yc.length.
	      if (b > 0) for (; b--; xc[i++] = 0);
	      b = BASE - 1;

	      // Subtract yc from xc.
	      for (; j > a;) {

	        if (xc[--j] < yc[j]) {
	          for (i = j; i && !xc[--i]; xc[i] = b);
	          --xc[i];
	          xc[j] += BASE;
	        }

	        xc[j] -= yc[j];
	      }

	      // Remove leading zeros and adjust exponent accordingly.
	      for (; xc[0] == 0; xc.splice(0, 1), --ye);

	      // Zero?
	      if (!xc[0]) {

	        // Following IEEE 754 (2008) 6.3,
	        // n - n = +0  but  n - n = -0  when rounding towards -Infinity.
	        y.s = ROUNDING_MODE == 3 ? -1 : 1;
	        y.c = [y.e = 0];
	        return y;
	      }

	      // No need to check for Infinity as +x - +y != Infinity && -x - -y != Infinity
	      // for finite x and y.
	      return normalise(y, xc, ye);
	    };


	    /*
	     *   n % 0 =  N
	     *   n % N =  N
	     *   n % I =  n
	     *   0 % n =  0
	     *  -0 % n = -0
	     *   0 % 0 =  N
	     *   0 % N =  N
	     *   0 % I =  0
	     *   N % n =  N
	     *   N % 0 =  N
	     *   N % N =  N
	     *   N % I =  N
	     *   I % n =  N
	     *   I % 0 =  N
	     *   I % N =  N
	     *   I % I =  N
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber modulo the value of
	     * BigNumber(y, b). The result depends on the value of MODULO_MODE.
	     */
	    P.modulo = P.mod = function (y, b) {
	      var q, s,
	        x = this;

	      y = new BigNumber(y, b);

	      // Return NaN if x is Infinity or NaN, or y is NaN or zero.
	      if (!x.c || !y.s || y.c && !y.c[0]) {
	        return new BigNumber(NaN);

	      // Return x if y is Infinity or x is zero.
	      } else if (!y.c || x.c && !x.c[0]) {
	        return new BigNumber(x);
	      }

	      if (MODULO_MODE == 9) {

	        // Euclidian division: q = sign(y) * floor(x / abs(y))
	        // r = x - qy    where  0 <= r < abs(y)
	        s = y.s;
	        y.s = 1;
	        q = div(x, y, 0, 3);
	        y.s = s;
	        q.s *= s;
	      } else {
	        q = div(x, y, 0, MODULO_MODE);
	      }

	      y = x.minus(q.times(y));

	      // To match JavaScript %, ensure sign of zero is sign of dividend.
	      if (!y.c[0] && MODULO_MODE == 1) y.s = x.s;

	      return y;
	    };


	    /*
	     *  n * 0 = 0
	     *  n * N = N
	     *  n * I = I
	     *  0 * n = 0
	     *  0 * 0 = 0
	     *  0 * N = N
	     *  0 * I = N
	     *  N * n = N
	     *  N * 0 = N
	     *  N * N = N
	     *  N * I = N
	     *  I * n = I
	     *  I * 0 = N
	     *  I * N = N
	     *  I * I = I
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber multiplied by the value
	     * of BigNumber(y, b).
	     */
	    P.multipliedBy = P.times = function (y, b) {
	      var c, e, i, j, k, m, xcL, xlo, xhi, ycL, ylo, yhi, zc,
	        base, sqrtBase,
	        x = this,
	        xc = x.c,
	        yc = (y = new BigNumber(y, b)).c;

	      // Either NaN, Â±Infinity or Â±0?
	      if (!xc || !yc || !xc[0] || !yc[0]) {

	        // Return NaN if either is NaN, or one is 0 and the other is Infinity.
	        if (!x.s || !y.s || xc && !xc[0] && !yc || yc && !yc[0] && !xc) {
	          y.c = y.e = y.s = null;
	        } else {
	          y.s *= x.s;

	          // Return Â±Infinity if either is Â±Infinity.
	          if (!xc || !yc) {
	            y.c = y.e = null;

	          // Return Â±0 if either is Â±0.
	          } else {
	            y.c = [0];
	            y.e = 0;
	          }
	        }

	        return y;
	      }

	      e = bitFloor(x.e / LOG_BASE) + bitFloor(y.e / LOG_BASE);
	      y.s *= x.s;
	      xcL = xc.length;
	      ycL = yc.length;

	      // Ensure xc points to longer array and xcL to its length.
	      if (xcL < ycL) zc = xc, xc = yc, yc = zc, i = xcL, xcL = ycL, ycL = i;

	      // Initialise the result array with zeros.
	      for (i = xcL + ycL, zc = []; i--; zc.push(0));

	      base = BASE;
	      sqrtBase = SQRT_BASE;

	      for (i = ycL; --i >= 0;) {
	        c = 0;
	        ylo = yc[i] % sqrtBase;
	        yhi = yc[i] / sqrtBase | 0;

	        for (k = xcL, j = i + k; j > i;) {
	          xlo = xc[--k] % sqrtBase;
	          xhi = xc[k] / sqrtBase | 0;
	          m = yhi * xlo + xhi * ylo;
	          xlo = ylo * xlo + ((m % sqrtBase) * sqrtBase) + zc[j] + c;
	          c = (xlo / base | 0) + (m / sqrtBase | 0) + yhi * xhi;
	          zc[j--] = xlo % base;
	        }

	        zc[j] = c;
	      }

	      if (c) {
	        ++e;
	      } else {
	        zc.splice(0, 1);
	      }

	      return normalise(y, zc, e);
	    };


	    /*
	     * Return a new BigNumber whose value is the value of this BigNumber negated,
	     * i.e. multiplied by -1.
	     */
	    P.negated = function () {
	      var x = new BigNumber(this);
	      x.s = -x.s || null;
	      return x;
	    };


	    /*
	     *  n + 0 = n
	     *  n + N = N
	     *  n + I = I
	     *  0 + n = n
	     *  0 + 0 = 0
	     *  0 + N = N
	     *  0 + I = I
	     *  N + n = N
	     *  N + 0 = N
	     *  N + N = N
	     *  N + I = N
	     *  I + n = I
	     *  I + 0 = I
	     *  I + N = N
	     *  I + I = I
	     *
	     * Return a new BigNumber whose value is the value of this BigNumber plus the value of
	     * BigNumber(y, b).
	     */
	    P.plus = function (y, b) {
	      var t,
	        x = this,
	        a = x.s;

	      y = new BigNumber(y, b);
	      b = y.s;

	      // Either NaN?
	      if (!a || !b) return new BigNumber(NaN);

	      // Signs differ?
	       if (a != b) {
	        y.s = -b;
	        return x.minus(y);
	      }

	      var xe = x.e / LOG_BASE,
	        ye = y.e / LOG_BASE,
	        xc = x.c,
	        yc = y.c;

	      if (!xe || !ye) {

	        // Return Â±Infinity if either Â±Infinity.
	        if (!xc || !yc) return new BigNumber(a / 0);

	        // Either zero?
	        // Return y if y is non-zero, x if x is non-zero, or zero if both are zero.
	        if (!xc[0] || !yc[0]) return yc[0] ? y : new BigNumber(xc[0] ? x : a * 0);
	      }

	      xe = bitFloor(xe);
	      ye = bitFloor(ye);
	      xc = xc.slice();

	      // Prepend zeros to equalise exponents. Faster to use reverse then do unshifts.
	      if (a = xe - ye) {
	        if (a > 0) {
	          ye = xe;
	          t = yc;
	        } else {
	          a = -a;
	          t = xc;
	        }

	        t.reverse();
	        for (; a--; t.push(0));
	        t.reverse();
	      }

	      a = xc.length;
	      b = yc.length;

	      // Point xc to the longer array, and b to the shorter length.
	      if (a - b < 0) t = yc, yc = xc, xc = t, b = a;

	      // Only start adding at yc.length - 1 as the further digits of xc can be ignored.
	      for (a = 0; b;) {
	        a = (xc[--b] = xc[b] + yc[b] + a) / BASE | 0;
	        xc[b] = BASE === xc[b] ? 0 : xc[b] % BASE;
	      }

	      if (a) {
	        xc = [a].concat(xc);
	        ++ye;
	      }

	      // No need to check for zero, as +x + +y != 0 && -x + -y != 0
	      // ye = MAX_EXP + 1 possible
	      return normalise(y, xc, ye);
	    };


	    /*
	     * If sd is undefined or null or true or false, return the number of significant digits of
	     * the value of this BigNumber, or null if the value of this BigNumber is Â±Infinity or NaN.
	     * If sd is true include integer-part trailing zeros in the count.
	     *
	     * Otherwise, if sd is a number, return a new BigNumber whose value is the value of this
	     * BigNumber rounded to a maximum of sd significant digits using rounding mode rm, or
	     * ROUNDING_MODE if rm is omitted.
	     *
	     * sd {number|boolean} number: significant digits: integer, 1 to MAX inclusive.
	     *                     boolean: whether to count integer-part trailing zeros: true or false.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
	     */
	    P.precision = P.sd = function (sd, rm) {
	      var c, n, v,
	        x = this;

	      if (sd != null && sd !== !!sd) {
	        intCheck(sd, 1, MAX);
	        if (rm == null) rm = ROUNDING_MODE;
	        else intCheck(rm, 0, 8);

	        return round(new BigNumber(x), sd, rm);
	      }

	      if (!(c = x.c)) return null;
	      v = c.length - 1;
	      n = v * LOG_BASE + 1;

	      if (v = c[v]) {

	        // Subtract the number of trailing zeros of the last element.
	        for (; v % 10 == 0; v /= 10, n--);

	        // Add the number of digits of the first element.
	        for (v = c[0]; v >= 10; v /= 10, n++);
	      }

	      if (sd && x.e + 1 > n) n = x.e + 1;

	      return n;
	    };


	    /*
	     * Return a new BigNumber whose value is the value of this BigNumber shifted by k places
	     * (powers of 10). Shift to the right if n > 0, and to the left if n < 0.
	     *
	     * k {number} Integer, -MAX_SAFE_INTEGER to MAX_SAFE_INTEGER inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {k}'
	     */
	    P.shiftedBy = function (k) {
	      intCheck(k, -MAX_SAFE_INTEGER, MAX_SAFE_INTEGER);
	      return this.times('1e' + k);
	    };


	    /*
	     *  sqrt(-n) =  N
	     *  sqrt(N) =  N
	     *  sqrt(-I) =  N
	     *  sqrt(I) =  I
	     *  sqrt(0) =  0
	     *  sqrt(-0) = -0
	     *
	     * Return a new BigNumber whose value is the square root of the value of this BigNumber,
	     * rounded according to DECIMAL_PLACES and ROUNDING_MODE.
	     */
	    P.squareRoot = P.sqrt = function () {
	      var m, n, r, rep, t,
	        x = this,
	        c = x.c,
	        s = x.s,
	        e = x.e,
	        dp = DECIMAL_PLACES + 4,
	        half = new BigNumber('0.5');

	      // Negative/NaN/Infinity/zero?
	      if (s !== 1 || !c || !c[0]) {
	        return new BigNumber(!s || s < 0 && (!c || c[0]) ? NaN : c ? x : 1 / 0);
	      }

	      // Initial estimate.
	      s = Math.sqrt(+valueOf(x));

	      // Math.sqrt underflow/overflow?
	      // Pass x to Math.sqrt as integer, then adjust the exponent of the result.
	      if (s == 0 || s == 1 / 0) {
	        n = coeffToString(c);
	        if ((n.length + e) % 2 == 0) n += '0';
	        s = Math.sqrt(+n);
	        e = bitFloor((e + 1) / 2) - (e < 0 || e % 2);

	        if (s == 1 / 0) {
	          n = '1e' + e;
	        } else {
	          n = s.toExponential();
	          n = n.slice(0, n.indexOf('e') + 1) + e;
	        }

	        r = new BigNumber(n);
	      } else {
	        r = new BigNumber(s + '');
	      }

	      // Check for zero.
	      // r could be zero if MIN_EXP is changed after the this value was created.
	      // This would cause a division by zero (x/t) and hence Infinity below, which would cause
	      // coeffToString to throw.
	      if (r.c[0]) {
	        e = r.e;
	        s = e + dp;
	        if (s < 3) s = 0;

	        // Newton-Raphson iteration.
	        for (; ;) {
	          t = r;
	          r = half.times(t.plus(div(x, t, dp, 1)));

	          if (coeffToString(t.c).slice(0, s) === (n = coeffToString(r.c)).slice(0, s)) {

	            // The exponent of r may here be one less than the final result exponent,
	            // e.g 0.0009999 (e-4) --> 0.001 (e-3), so adjust s so the rounding digits
	            // are indexed correctly.
	            if (r.e < e) --s;
	            n = n.slice(s - 3, s + 1);

	            // The 4th rounding digit may be in error by -1 so if the 4 rounding digits
	            // are 9999 or 4999 (i.e. approaching a rounding boundary) continue the
	            // iteration.
	            if (n == '9999' || !rep && n == '4999') {

	              // On the first iteration only, check to see if rounding up gives the
	              // exact result as the nines may infinitely repeat.
	              if (!rep) {
	                round(t, t.e + DECIMAL_PLACES + 2, 0);

	                if (t.times(t).eq(x)) {
	                  r = t;
	                  break;
	                }
	              }

	              dp += 4;
	              s += 4;
	              rep = 1;
	            } else {

	              // If rounding digits are null, 0{0,4} or 50{0,3}, check for exact
	              // result. If not, then there are further digits and m will be truthy.
	              if (!+n || !+n.slice(1) && n.charAt(0) == '5') {

	                // Truncate to the first rounding digit.
	                round(r, r.e + DECIMAL_PLACES + 2, 1);
	                m = !r.times(r).eq(x);
	              }

	              break;
	            }
	          }
	        }
	      }

	      return round(r, r.e + DECIMAL_PLACES + 1, ROUNDING_MODE, m);
	    };


	    /*
	     * Return a string representing the value of this BigNumber in exponential notation and
	     * rounded using ROUNDING_MODE to dp fixed decimal places.
	     *
	     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
	     */
	    P.toExponential = function (dp, rm) {
	      if (dp != null) {
	        intCheck(dp, 0, MAX);
	        dp++;
	      }
	      return format(this, dp, rm, 1);
	    };


	    /*
	     * Return a string representing the value of this BigNumber in fixed-point notation rounding
	     * to dp fixed decimal places using rounding mode rm, or ROUNDING_MODE if rm is omitted.
	     *
	     * Note: as with JavaScript's number type, (-0).toFixed(0) is '0',
	     * but e.g. (-0.00001).toFixed(0) is '-0'.
	     *
	     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
	     */
	    P.toFixed = function (dp, rm) {
	      if (dp != null) {
	        intCheck(dp, 0, MAX);
	        dp = dp + this.e + 1;
	      }
	      return format(this, dp, rm);
	    };


	    /*
	     * Return a string representing the value of this BigNumber in fixed-point notation rounded
	     * using rm or ROUNDING_MODE to dp decimal places, and formatted according to the properties
	     * of the format or FORMAT object (see BigNumber.set).
	     *
	     * The formatting object may contain some or all of the properties shown below.
	     *
	     * FORMAT = {
	     *   prefix: '',
	     *   groupSize: 3,
	     *   secondaryGroupSize: 0,
	     *   groupSeparator: ',',
	     *   decimalSeparator: '.',
	     *   fractionGroupSize: 0,
	     *   fractionGroupSeparator: '\xA0',      // non-breaking space
	     *   suffix: ''
	     * };
	     *
	     * [dp] {number} Decimal places. Integer, 0 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     * [format] {object} Formatting options. See FORMAT pbject above.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {dp|rm}'
	     * '[BigNumber Error] Argument not an object: {format}'
	     */
	    P.toFormat = function (dp, rm, format) {
	      var str,
	        x = this;

	      if (format == null) {
	        if (dp != null && rm && typeof rm == 'object') {
	          format = rm;
	          rm = null;
	        } else if (dp && typeof dp == 'object') {
	          format = dp;
	          dp = rm = null;
	        } else {
	          format = FORMAT;
	        }
	      } else if (typeof format != 'object') {
	        throw Error
	          (bignumberError + 'Argument not an object: ' + format);
	      }

	      str = x.toFixed(dp, rm);

	      if (x.c) {
	        var i,
	          arr = str.split('.'),
	          g1 = +format.groupSize,
	          g2 = +format.secondaryGroupSize,
	          groupSeparator = format.groupSeparator || '',
	          intPart = arr[0],
	          fractionPart = arr[1],
	          isNeg = x.s < 0,
	          intDigits = isNeg ? intPart.slice(1) : intPart,
	          len = intDigits.length;

	        if (g2) i = g1, g1 = g2, g2 = i, len -= i;

	        if (g1 > 0 && len > 0) {
	          i = len % g1 || g1;
	          intPart = intDigits.substr(0, i);
	          for (; i < len; i += g1) intPart += groupSeparator + intDigits.substr(i, g1);
	          if (g2 > 0) intPart += groupSeparator + intDigits.slice(i);
	          if (isNeg) intPart = '-' + intPart;
	        }

	        str = fractionPart
	         ? intPart + (format.decimalSeparator || '') + ((g2 = +format.fractionGroupSize)
	          ? fractionPart.replace(new RegExp('\\d{' + g2 + '}\\B', 'g'),
	           '$&' + (format.fractionGroupSeparator || ''))
	          : fractionPart)
	         : intPart;
	      }

	      return (format.prefix || '') + str + (format.suffix || '');
	    };


	    /*
	     * Return an array of two BigNumbers representing the value of this BigNumber as a simple
	     * fraction with an integer numerator and an integer denominator.
	     * The denominator will be a positive non-zero value less than or equal to the specified
	     * maximum denominator. If a maximum denominator is not specified, the denominator will be
	     * the lowest value necessary to represent the number exactly.
	     *
	     * [md] {number|string|BigNumber} Integer >= 1, or Infinity. The maximum denominator.
	     *
	     * '[BigNumber Error] Argument {not an integer|out of range} : {md}'
	     */
	    P.toFraction = function (md) {
	      var d, d0, d1, d2, e, exp, n, n0, n1, q, r, s,
	        x = this,
	        xc = x.c;

	      if (md != null) {
	        n = new BigNumber(md);

	        // Throw if md is less than one or is not an integer, unless it is Infinity.
	        if (!n.isInteger() && (n.c || n.s !== 1) || n.lt(ONE)) {
	          throw Error
	            (bignumberError + 'Argument ' +
	              (n.isInteger() ? 'out of range: ' : 'not an integer: ') + valueOf(n));
	        }
	      }

	      if (!xc) return new BigNumber(x);

	      d = new BigNumber(ONE);
	      n1 = d0 = new BigNumber(ONE);
	      d1 = n0 = new BigNumber(ONE);
	      s = coeffToString(xc);

	      // Determine initial denominator.
	      // d is a power of 10 and the minimum max denominator that specifies the value exactly.
	      e = d.e = s.length - x.e - 1;
	      d.c[0] = POWS_TEN[(exp = e % LOG_BASE) < 0 ? LOG_BASE + exp : exp];
	      md = !md || n.comparedTo(d) > 0 ? (e > 0 ? d : n1) : n;

	      exp = MAX_EXP;
	      MAX_EXP = 1 / 0;
	      n = new BigNumber(s);

	      // n0 = d1 = 0
	      n0.c[0] = 0;

	      for (; ;)  {
	        q = div(n, d, 0, 1);
	        d2 = d0.plus(q.times(d1));
	        if (d2.comparedTo(md) == 1) break;
	        d0 = d1;
	        d1 = d2;
	        n1 = n0.plus(q.times(d2 = n1));
	        n0 = d2;
	        d = n.minus(q.times(d2 = d));
	        n = d2;
	      }

	      d2 = div(md.minus(d0), d1, 0, 1);
	      n0 = n0.plus(d2.times(n1));
	      d0 = d0.plus(d2.times(d1));
	      n0.s = n1.s = x.s;
	      e = e * 2;

	      // Determine which fraction is closer to x, n0/d0 or n1/d1
	      r = div(n1, d1, e, ROUNDING_MODE).minus(x).abs().comparedTo(
	          div(n0, d0, e, ROUNDING_MODE).minus(x).abs()) < 1 ? [n1, d1] : [n0, d0];

	      MAX_EXP = exp;

	      return r;
	    };


	    /*
	     * Return the value of this BigNumber converted to a number primitive.
	     */
	    P.toNumber = function () {
	      return +valueOf(this);
	    };


	    /*
	     * Return a string representing the value of this BigNumber rounded to sd significant digits
	     * using rounding mode rm or ROUNDING_MODE. If sd is less than the number of digits
	     * necessary to represent the integer part of the value in fixed-point notation, then use
	     * exponential notation.
	     *
	     * [sd] {number} Significant digits. Integer, 1 to MAX inclusive.
	     * [rm] {number} Rounding mode. Integer, 0 to 8 inclusive.
	     *
	     * '[BigNumber Error] Argument {not a primitive number|not an integer|out of range}: {sd|rm}'
	     */
	    P.toPrecision = function (sd, rm) {
	      if (sd != null) intCheck(sd, 1, MAX);
	      return format(this, sd, rm, 2);
	    };


	    /*
	     * Return a string representing the value of this BigNumber in base b, or base 10 if b is
	     * omitted. If a base is specified, including base 10, round according to DECIMAL_PLACES and
	     * ROUNDING_MODE. If a base is not specified, and this BigNumber has a positive exponent
	     * that is equal to or greater than TO_EXP_POS, or a negative exponent equal to or less than
	     * TO_EXP_NEG, return exponential notation.
	     *
	     * [b] {number} Integer, 2 to ALPHABET.length inclusive.
	     *
	     * '[BigNumber Error] Base {not a primitive number|not an integer|out of range}: {b}'
	     */
	    P.toString = function (b) {
	      var str,
	        n = this,
	        s = n.s,
	        e = n.e;

	      // Infinity or NaN?
	      if (e === null) {
	        if (s) {
	          str = 'Infinity';
	          if (s < 0) str = '-' + str;
	        } else {
	          str = 'NaN';
	        }
	      } else {
	        str = coeffToString(n.c);

	        if (b == null) {
	          str = e <= TO_EXP_NEG || e >= TO_EXP_POS
	           ? toExponential(str, e)
	           : toFixedPoint(str, e, '0');
	        } else {
	          intCheck(b, 2, ALPHABET.length, 'Base');
	          str = convertBase(toFixedPoint(str, e, '0'), 10, b, s, true);
	        }

	        if (s < 0 && n.c[0]) str = '-' + str;
	      }

	      return str;
	    };


	    /*
	     * Return as toString, but do not accept a base argument, and include the minus sign for
	     * negative zero.
	     */
	    P.valueOf = P.toJSON = function () {
	      return valueOf(this);
	    };


	    P._isBigNumber = true;

	    if (typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol') {
	      P[Symbol.toStringTag] = 'BigNumber';
	      // Node.js v10.12.0+
	      P[Symbol.for('nodejs.util.inspect.custom')] = P.valueOf;
	    }

	    if (configObject != null) BigNumber.set(configObject);

	    return BigNumber;
	  }


	  // PRIVATE HELPER FUNCTIONS


	  function bitFloor(n) {
	    var i = n | 0;
	    return n > 0 || n === i ? i : i - 1;
	  }


	  // Return a coefficient array as a string of base 10 digits.
	  function coeffToString(a) {
	    var s, z,
	      i = 1,
	      j = a.length,
	      r = a[0] + '';

	    for (; i < j;) {
	      s = a[i++] + '';
	      z = LOG_BASE - s.length;
	      for (; z--; s = '0' + s);
	      r += s;
	    }

	    // Determine trailing zeros.
	    for (j = r.length; r.charCodeAt(--j) === 48;);

	    return r.slice(0, j + 1 || 1);
	  }


	  // Compare the value of BigNumbers x and y.
	  function compare(x, y) {
	    var a, b,
	      xc = x.c,
	      yc = y.c,
	      i = x.s,
	      j = y.s,
	      k = x.e,
	      l = y.e;

	    // Either NaN?
	    if (!i || !j) return null;

	    a = xc && !xc[0];
	    b = yc && !yc[0];

	    // Either zero?
	    if (a || b) return a ? b ? 0 : -j : i;

	    // Signs differ?
	    if (i != j) return i;

	    a = i < 0;
	    b = k == l;

	    // Either Infinity?
	    if (!xc || !yc) return b ? 0 : !xc ^ a ? 1 : -1;

	    // Compare exponents.
	    if (!b) return k > l ^ a ? 1 : -1;

	    j = (k = xc.length) < (l = yc.length) ? k : l;

	    // Compare digit by digit.
	    for (i = 0; i < j; i++) if (xc[i] != yc[i]) return xc[i] > yc[i] ^ a ? 1 : -1;

	    // Compare lengths.
	    return k == l ? 0 : k > l ^ a ? 1 : -1;
	  }


	  /*
	   * Check that n is a primitive number, an integer, and in range, otherwise throw.
	   */
	  function intCheck(n, min, max, name) {
	    if (n < min || n > max || n !== (n < 0 ? mathceil(n) : mathfloor(n))) {
	      throw Error
	       (bignumberError + (name || 'Argument') + (typeof n == 'number'
	         ? n < min || n > max ? ' out of range: ' : ' not an integer: '
	         : ' not a primitive number: ') + String(n));
	    }
	  }


	  // Assumes finite n.
	  function isOdd(n) {
	    var k = n.c.length - 1;
	    return bitFloor(n.e / LOG_BASE) == k && n.c[k] % 2 != 0;
	  }


	  function toExponential(str, e) {
	    return (str.length > 1 ? str.charAt(0) + '.' + str.slice(1) : str) +
	     (e < 0 ? 'e' : 'e+') + e;
	  }


	  function toFixedPoint(str, e, z) {
	    var len, zs;

	    // Negative exponent?
	    if (e < 0) {

	      // Prepend zeros.
	      for (zs = z + '.'; ++e; zs += z);
	      str = zs + str;

	    // Positive exponent
	    } else {
	      len = str.length;

	      // Append zeros.
	      if (++e > len) {
	        for (zs = z, e -= len; --e; zs += z);
	        str += zs;
	      } else if (e < len) {
	        str = str.slice(0, e) + '.' + str.slice(e);
	      }
	    }

	    return str;
	  }


	  // EXPORT


	  BigNumber = clone();
	  BigNumber['default'] = BigNumber.BigNumber = BigNumber;

	  // AMD.
	  if ( module.exports) {
	    module.exports = BigNumber;

	  // Browser.
	  } else {
	    if (!globalObject) {
	      globalObject = typeof self != 'undefined' && self ? self : window;
	    }

	    globalObject.BigNumber = BigNumber;
	  }
	})(commonjsGlobal);
	});

	var isPeeringEnabled = true;

	var P2P =
	/*#__PURE__*/
	function () {
	  function P2P() {
	    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, P2P);

	    this.config = config;
	    this.context = config.context;
	    this.userId = config.userId;
	    this.videoId = config.videoId;
	    this.id = null;
	    this.factory = null;
	    this.peers = {};
	    this.siblings = {}; // rpc

	    this.rpcNonce_ = 0;
	    this.rpcOutstandingCalls_ = {};
	    this.txCounter_ = 0; // client configuration

	    this.probeTimeout = config.probeTimeout;
	    this.fragmentTimeout = config.fragmentTimeout;
	    this.failoverFactor = config.failoverFactor;
	    this.probeRetry = 3;
	    this.firstPeerReq = true;
	    this.hasReceivedPeers = false;
	    this.peerReqInterval = 120000;
	    this.rangeNumber = 1;
	    this.urlBitrateMap = {}; // used in plugin player

	    this.allowRangeRequests = config.allowRangeRequests;
	    this.useCDN = false;
	    this.ucn = {};
	    this.rangeNumber = 1;
	    this.peerReqIntervalId_ = undefined;
	    this.segUrlBypassQuery = true;
	    this.heartbeater_ = null;
	    this.reconnectIntervalID_ = null;
	    this.pingTestTimeTicker = null;
	    this.useUCN = false;
	    this.connectionType = undefined;
	    this.receiveMap = {};
	    this.hasEnableProbeRace = true;
	    this.getFragResults = [];
	    this.counterMap = {};
	    this.blackList = {};
	    this.passRate = 0.5;
	    this.minBlockNum = 50;
	    this.windowSize = 10;
	  }

	  _createClass(P2P, [{
	    key: "start",
	    value: function () {
	      var _start = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee() {
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                Logger.debug("P2P Start userId=".concat(this.userId, ", videoId=").concat(this.videoId));
	                Logger.debug("probeTimeout=".concat(this.probeTimeout, ", fragmentTimeout=").concat(this.fragmentTimeout));
	                _context.next = 4;
	                return this.joinPeerjsServer();

	              case 4:
	                _context.next = 6;
	                return this.joinPeerGroupServer();

	              case 6:
	                //this.startPeerReqInterval()
	                if (this.peerReqIntervalId_) {
	                  clearInterval(this.peerReqIntervalId_);
	                }

	                this.peerReqIntervalId_ = setInterval(this.getPeers.bind(this), 6000);

	              case 8:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function start() {
	        return _start.apply(this, arguments);
	      }

	      return start;
	    }()
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      //Clear intervals
	      if (this.peerReqIntervalId_) {
	        clearInterval(this.peerReqIntervalId_);
	      } //Destroy peerJS connections


	      if (this.factory) {
	        this.factory.destroy();
	      }

	      this.context = null;
	    }
	  }, {
	    key: "startPeerReqInterval",
	    value: function startPeerReqInterval() {
	      clearInterval(this.peerReqIntervalId_);
	      this.peerReqIntervalId_ = setInterval(this.getPeers.bind(this), this.peerReqInterval);
	    }
	  }, {
	    key: "startPingTestTimer",
	    value: function startPingTestTimer() {
	      this.pingTestTimeTicker = Date.now();
	    }
	  }, {
	    key: "makePeerHeartbeater",
	    value: function makePeerHeartbeater(peer) {
	      Logger.info('In makePeerHeartbeater for peer ID: ', peer.id);
	      var timeoutId = 0;

	      function heartbeat() {
	        timeoutId = setTimeout(heartbeat, 30000);

	        if (peer.socket._wsOpen()) {
	          Logger.info('Peer (me) sending heartbeat to server!');
	          peer.socket.send({
	            type: 'HEARTBEAT'
	          });
	        }
	      } // Start


	      heartbeat(); // return

	      return {
	        start: function start() {
	          if (timeoutId === 0) {
	            heartbeat();
	          }
	        },
	        stop: function stop() {
	          clearTimeout(timeoutId);
	          timeoutId = 0;
	        }
	      };
	    }
	  }, {
	    key: "stringifyBigNumberValues",
	    value: function stringifyBigNumberValues(obj) {
	      var o = {};
	      Object.keys(obj).forEach(function (k) {
	        var value = obj[k];

	        if (bignumber.isBigNumber(value)) {
	          //Big Numbers are converted to strings
	          o[k] = value.toJSON();
	        } else {
	          o[k] = obj[k];
	        }
	      });
	      return o;
	    }
	  }, {
	    key: "joinPeerjsServer",
	    value: function () {
	      var _joinPeerjsServer = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee2() {
	        var _this = this;

	        return regeneratorRuntime.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                Logger.debug("joinPeerjsServer");
	                return _context2.abrupt("return", new Promise(function (resolve, reject) {
	                  _this.factory = new Peer({
	                    host: _this.config.server.host,
	                    port: _this.config.server.port,
	                    secure: _this.config.server.secure,
	                    debug: 0,
	                    config: {
	                      'iceServers': [{
	                        url: 'stun:stun.l.google.com:19302'
	                      }]
	                    }
	                  });

	                  _this.factory.on('open', function (id) {
	                    Logger.info('Peer ID is:', id);
	                    _this.id = id;

	                    _this.context.trigger(ThetaEvents.PEER_ID_CHANGED, {
	                      id: id
	                    });

	                    Logger.info('PeerJS open...resolving');
	                    _this.heartbeater_ = _this.makePeerHeartbeater(_this.factory); //Clear the old retry timeout

	                    if (_this.reconnectIntervalID_) {
	                      clearTimeout(_this.reconnectIntervalID_);
	                    }

	                    resolve();
	                  });

	                  _this.factory.on('disconnected', function () {
	                    Logger.info('Peer (me) has been disconneted!'); //Logger.info('Peer (me) trying to reconnect...');
	                    // //Try to reconnect after 5 secs
	                    // let self = this;
	                    // let reconnectFn = function(
	                    //   if(self.factory.disconnected){
	                    //     self.factory.reconnect();
	                    //   }
	                    // };
	                    // setTimeout(reconnectFn, 6000);
	                  });

	                  _this.factory.on('error', function (err) {
	                    Logger.info('Peer (me) connection error: ', err.type);
	                    Logger.info('Peer (me) will try to connect again...'); // //Stop the heartbeat
	                    // if(this.heartbeater_){
	                    //   this.heartbeater_.stop();
	                    // }
	                    //Try to reconnect...

	                    var self = _this;
	                    var shouldTryToReconnectAgain = true;

	                    var reconnectFn = function reconnectFn() {
	                      Logger.info('Peer (me) attempting to reconnect...');

	                      if (!self.factory || self.factory.destroyed) {
	                        // Do not attempt a reconnect, the server has been destroyed. Attempt a whole new connection.
	                        self.factory = null;
	                        shouldTryToReconnectAgain = false;
	                        self.start();
	                      } else if (self.factory.disconnected) {
	                        self.factory.reconnect();
	                      }
	                    }; //Clear the old timeout, and try again in 3 secs...


	                    if (_this.reconnectIntervalID_) {
	                      clearTimeout(_this.reconnectIntervalID_);
	                    }

	                    if (shouldTryToReconnectAgain) {
	                      _this.reconnectIntervalID_ = setTimeout(reconnectFn, 5000);
	                    }
	                  });

	                  _this.factory.on('connection', _this.setupPeerConnection.bind(_this));
	                }));

	              case 2:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2);
	      }));

	      function joinPeerjsServer() {
	        return _joinPeerjsServer.apply(this, arguments);
	      }

	      return joinPeerjsServer;
	    }()
	  }, {
	    key: "joinPeerGroupServer",
	    value: function () {
	      var _joinPeerGroupServer = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee3() {
	        var _this2 = this;

	        return regeneratorRuntime.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                Logger.debug("joinPeerGroupServer");
	                Logger.debug("this.context.socket == " + this.context.socket);
	                this.context.socket.emit('join', {
	                  id: this.id,
	                  userId: this.userId,
	                  videoId: this.videoId
	                });
	                this.context.socket.emit('getconfig', {
	                  id: this.id,
	                  videoId: this.videoId
	                });
	                this.context.socket.on('getpeers_reply', function (msg) {
	                  var result = msg.result;
	                  _this2.hasReceivedPeers = true;
	                  var response = msg.response;
	                  var ucnNodes = response.ucn;
	                  Logger.info('Peers have received status: ' + _this2.hasReceivedPeers);
	                  Logger.debug('whole msg: ', msg);
	                  Logger.debug('Received getpeers_reply msg=', msg.response);
	                  Logger.debug('Received getpeers_reply ucn =', ucnNodes); // const flag = Math.random();
	                  // Logger.debug('Flag =', flag);

	                  if (ucnNodes && ucnNodes.length !== 0) {
	                    _this2.useUCN = true;
	                    _this2.ucn = {
	                      host: ucnNodes[0].host,
	                      stream_map: ucnNodes[0].stream_map
	                    };
	                  } else {
	                    _this2.useUCN = false;
	                    _this2.ucn = {};
	                  }

	                  if (result === 'KOK') {
	                    //TODO: add use UCN checking
	                    _this2.handlePeerConnection(msg.response.peer);
	                  } else {
	                    Logger.error('getpeers_reply error:', msg.response);
	                  }

	                  if (_this2.firstPeerReq) {
	                    _this2.startPeerReqInterval();

	                    _this2.firstPeerReq = false;
	                  } // Save peer payment auth tokens to wallet.


	                  if (!_this2.context.wallet.isReady()) {
	                    return;
	                  }

	                  if (ucnNodes) {
	                    for (var i = 0; i < ucnNodes.length; i++) {
	                      if (ucnNodes[i].auth) {
	                        var auth = ucnNodes[i].auth;
	                        var peerUserID = auth.a != _this2.context.wallet.account.user_id ? auth.a : auth.b;

	                        _this2.context.wallet.addAuth(peerUserID, auth.exp, auth.token);
	                      }
	                    }
	                  }

	                  if (response.peer) {
	                    var peer = response.peer;

	                    for (var _i = 0; _i < peer.length; _i++) {
	                      if (peer[_i].auth) {
	                        var _auth = peer[_i].auth;

	                        var _peerUserID = _auth.a != _this2.context.wallet.account.user_id ? _auth.a : _auth.b;

	                        _this2.context.wallet.addAuth(_peerUserID, _auth.exp, _auth.token);
	                      }
	                    }
	                  }
	                });
	                this.context.socket.on('getconfig_reply', function (msg) {
	                  Logger.debug('Received getconfig_reply, msg=', msg); // config issued by config_manager should already be validated

	                  _this2.probeTimeout = msg.probeTimeout;
	                  _this2.fragmentTimeout = msg.fragmentTimeout;
	                  _this2.probeRetry = msg.probeRetry;
	                  _this2.peerReqInterval = msg.peerReqInterval;
	                  _this2.failoverFactor = msg.failoverFactor;
	                  _this2.useCDN = msg.useCDN;
	                  _this2.segUrlBypassQuery = msg.segUrlBypassQuery;
	                  _this2.rangeNumber = msg.rangeNumber;
	                  _this2.hasEnableProbeRace = msg.probePeerRace;

	                  if (msg.urlBitrateMap !== undefined && msg.urlBitrateMap instanceof Object) {
	                    _this2.urlBitrateMap = msg.urlBitrateMap;
	                  }

	                  if (msg.rangeNumber !== undefined) {
	                    _this2.rangeNumber = msg.rangeNumber;
	                  }
	                }); // dynamic configuration change

	                this.context.socket.on('setconfig', function (msg) {
	                  if (msg.id === 'all' || msg.id === _this2.id || msg.videoId === _this2.videoId) {
	                    Logger.debug('Received setconfig request, msg=' + JSON.stringify(msg));

	                    if (msg.config['useCDN'] === undefined && msg.config['probeTimeout'] === undefined && msg.config['fragmentTimeout'] === undefined && msg.config['probeRetry'] === undefined && msg.config['rangeNumber'] === undefined && msg.config['peerReqInterval'] === undefined && msg.config['failoverFactor'] === undefined && msg.config['probePeerRace'] === undefined) {
	                      Logger.error('configuration message is not supported');
	                      return;
	                    }

	                    if (msg.config.useCDN !== undefined) {
	                      _this2.useCDN = msg.config.useCDN;
	                    }

	                    if (msg.config.probeRetry !== undefined) {
	                      _this2.probeRetry = msg.config.probeRetry;
	                    }

	                    if (msg.config.failoverFactor !== undefined) {
	                      _this2.failoverFactor = msg.config.failoverFactor;
	                    }

	                    if (msg.config.rangeNumber !== undefined) {
	                      var rangeNumber = msg.config.rangeNumber;

	                      if (Number.isInteger(rangeNumber) && rangeNumber > 0) {
	                        _this2.rangeNumber = rangeNumber;
	                      }
	                    }

	                    if (msg.config.peerReqInterval !== undefined) {
	                      var peerReqInterval = msg.config.peerReqInterval;

	                      if (Number.isInteger(peerReqInterval) && peerReqInterval > 1000) {
	                        _this2.peerReqInterval = peerReqInterval;

	                        _this2.startPeerReqInterval();
	                      }
	                    }

	                    if (msg.config.probeTimeout !== undefined) {
	                      var probeTimeout = msg.config.probeTimeout;

	                      if (Number.isInteger(probeTimeout) && probeTimeout > 0) {
	                        _this2.probeTimeout = probeTimeout;
	                      }
	                    }

	                    if (msg.config.fragmentTimeout !== undefined) {
	                      var fragmentTimeout = msg.config.fragmentTimeout;

	                      if (Number.isInteger(fragmentTimeout) && fragmentTimeout > 0) {
	                        _this2.fragmentTimeout = fragmentTimeout;
	                      }
	                    }

	                    if (msg.config.rangeNumber !== undefined) {
	                      var _rangeNumber = msg.config.rangeNumber;

	                      if (Number.isInteger(_rangeNumber) && _rangeNumber > 0) {
	                        _this2.rangeNumber = _rangeNumber;
	                      }
	                    }

	                    if (msg.config.segUrlBypassQuery !== undefined) {
	                      _this2.segUrlBypassQuery = msg.config.segUrlBypassQuery;
	                    }

	                    if (msg.config.probePeerRace !== undefined) {
	                      _this2.hasEnableProbeRace = msg.config.probePeerRace;
	                    }

	                    var peerConfig = _this2.getPeerConfig();

	                    var resp = {
	                      id: _this2.id,
	                      config: peerConfig
	                    };
	                    Logger.info(resp);

	                    _this2.context.socket.emit('setconfig_reply', resp);
	                  }
	                });
	                this.context.socket.on('getconfig', function (msg) {
	                  Logger.info('Received config from server, msg=', msg);

	                  var peerConfig = _this2.getPeerConfig();

	                  var resp = {
	                    id: _this2.id,
	                    config: peerConfig
	                  };
	                  Logger.info(resp);

	                  _this2.context.socket.emit('getconfig_reply', resp);
	                });
	                this.context.socket.on('pingtest', function (msg) {
	                  Logger.info("Received pingtest req from server for id=".concat(msg.id));

	                  if (_this2.id !== msg.id) {
	                    Logger.error("id=".concat(msg.id, " doesn't match up with peer id=").concat(_this2.id));
	                  } else {
	                    // broadcast ping test request to every connected peers
	                    var pingResults = _this2.sendPingTest();

	                    pingResults.then(function (response) {
	                      Logger.info("pingtest for id=".concat(msg.id, " results= ").concat(JSON.stringify(response)));

	                      _this2.context.socket.emit('pingtest_reply', {
	                        id: _this2.id,
	                        result: response
	                      });
	                    }).catch(function (error) {
	                      Logger.info("pingtest for id=".concat(msg.id, " results with error: ").concat(error.message));

	                      _this2.context.socket.emit('pingtest_reply', {
	                        id: _this2.id,
	                        result: error.message
	                      });
	                    });
	                  }
	                });

	              case 9:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      }));

	      function joinPeerGroupServer() {
	        return _joinPeerGroupServer.apply(this, arguments);
	      }

	      return joinPeerGroupServer;
	    }()
	  }, {
	    key: "handlePeerConnection",
	    value: function handlePeerConnection(peerInfo) {
	      if (!peerInfo) {
	        return;
	      }

	      Logger.info('latest peers info for  - ', this.id + ' total peers: ' + peerInfo.length);

	      try {
	        var newPeerIds = new Set();

	        for (var i = 0; i < peerInfo.length; i++) {
	          var geo = peerInfo[i].geo;
	          var peerId = peerInfo[i]._id; //Logger.info('peerid - "%s", ip - "%s", country - "%s", region - "%s"', peerId, peerInfo[i].ip, geo.country, geo.region);

	          newPeerIds.add(peerId);

	          if (!this.peers[peerId]) {
	            Logger.info('connect to new peer ', peerId);
	            this.connectToPeer(peerId);
	          }
	        } // remove peerIds that no longer in the latest peer set


	        for (var k in this.peers) {
	          if (this.peers.hasOwnProperty(k)) {
	            if (!newPeerIds.has(k)) {
	              Logger.info("old peer ".concat(k, " is removed"));
	              delete this.peers[k];
	            }
	          }
	        }
	      } catch (error) {
	        Logger.error('caught up exception: ', error.message);
	      } //TODO not sure if this is right


	      this.updateNumPeers();
	    }
	  }, {
	    key: "setupPeerConnection",
	    value: function setupPeerConnection(conn) {
	      var _this3 = this;

	      Logger.info('Received incoming connection from', conn.peer);
	      this.peers[conn.peer] = conn;
	      conn.on('data', function (msg) {
	        _this3.peerMessageHandler(msg, conn);
	      });
	    }
	  }, {
	    key: "sendPingTest",
	    value: function () {
	      var _sendPingTest = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee4() {
	        var _this4 = this;

	        var pingPromises, _loop, peerid;

	        return regeneratorRuntime.wrap(function _callee4$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	                Logger.info("start sends pingReq to all its peers, id=".concat(this.id));
	                this.startPingTestTimer();
	                pingPromises = [];

	                _loop = function _loop(peerid) {
	                  var pingReq = [];
	                  var conn = _this4.peers[peerid];
	                  var timeout = new Promise(function (resolve, reject) {
	                    var id = setTimeout(function () {
	                      clearTimeout(id);
	                      resolve({
	                        id: peerid,
	                        result: 'Ping timeout in 1000 ms'
	                      });
	                    }, 1000);
	                  });
	                  pingReq.push(timeout);

	                  var resp = _this4.makeRPC(conn, 'pingReq', {
	                    id: _this4.id
	                  });

	                  pingReq.push(resp);
	                  pingPromises.push(Promise.race(pingReq));
	                };

	                for (peerid in this.peers) {
	                  _loop(peerid);
	                }

	                return _context4.abrupt("return", Promise.all(pingPromises));

	              case 6:
	              case "end":
	                return _context4.stop();
	            }
	          }
	        }, _callee4, this);
	      }));

	      function sendPingTest() {
	        return _sendPingTest.apply(this, arguments);
	      }

	      return sendPingTest;
	    }()
	  }, {
	    key: "peerMessageHandler",
	    value: function peerMessageHandler(msg, conn) {
	      var peerid = conn.peer;

	      if (isPeeringEnabled) {
	        Logger.debug("[".concat(peerid, "] peerMessageHandler: type = "), msg.type);

	        switch (msg.type) {
	          case 'rpc_request':
	            var method = msg.method;
	            Logger.debug("[".concat(peerid, "] RPC request received - ").concat(msg.nonce, " - ").concat(msg.method));

	            if (method === 'probeFragment') {
	              var result = this[method].call(this, msg.arg);

	              if (result && result.result === 'kOKFound') {
	                conn.send({
	                  type: 'rpc_response',
	                  nonce: msg.nonce,
	                  result: result
	                });
	                Logger.debug("[".concat(peerid, "] RPC request ").concat(msg.nonce, " processed , found in cache, resp sent!"));
	                this.context.playerStats.processFragmentReq(peerid, 'probe_req_accept');
	              } else {
	                // not found, don't reply
	                if (!this.hasEnableProbeRace) {
	                  conn.send({
	                    type: 'rpc_response',
	                    nonce: msg.nonce,
	                    result: result
	                  });
	                  Logger.debug("[".concat(peerid, "] RPC request ").concat(msg.nonce, " processed, not cached, reply sent."));
	                }

	                this.context.playerStats.processFragmentReq(peerid, 'probe_req_notFound');
	              }
	            } else if (method === 'getFragment') {
	              // getFragment
	              if (this.txCounter_ >= this.context.maxConcurrentPeerTxs) {
	                // busy
	                var args = msg.arg;
	                var key = args.key;
	                Logger.debug("[".concat(peerid, "] RPC request ").concat(msg.nonce, " rejected due to peer ").concat(this.id, " busy"));
	                conn.send({
	                  type: 'rpc_response',
	                  nonce: msg.nonce,
	                  result: {
	                    url: key,
	                    result: 'kBusy'
	                  }
	                });
	                this.context.playerStats.processFragmentReq(peerid, 'fragment_req_notSent');
	              } else {
	                var start_tx_time = Math.floor(Date.now());
	                this.txCounter_++;
	                Logger.debug("[".concat(peerid, "] RPC request ").concat(msg.nonce, " accepted, sending to peer ... "));

	                try {
	                  var _result = this[method].call(this, msg.arg);

	                  conn.send({
	                    type: 'rpc_response',
	                    nonce: msg.nonce,
	                    result: _result
	                  });
	                  var end_tx_time = Math.floor(Date.now());
	                  Logger.debug("[".concat(peerid, "] RPC request ").concat(msg.nonce, " sending Done in ").concat(end_tx_time - start_tx_time, " ms!"));
	                  this.context.playerStats.processFragment(msg.arg.key, 'toPeer', _result.data.byteLength, end_tx_time - start_tx_time);
	                  this.context.playerStats.processFragmentReq(peerid, 'fragment_req_accept');
	                } catch (err) {
	                  Logger.error("RPC request ".concat(err.message, " sending failed!"));
	                  this.context.playerStats.processFragmentReq(peerid, 'fragment_req_failSent');
	                } finally {
	                  this.txCounter_--;
	                }
	              }
	            } else if (method === 'pingReq') {
	              // received pingtest request from its peer
	              Logger.info("[".concat(peerid, "] Received pingtest req from peer id=").concat(msg.arg.id));
	              conn.send({
	                type: 'rpc_response',
	                nonce: msg.nonce,
	                result: {
	                  id: this.id,
	                  result: 'pingReq_reply'
	                }
	              });
	            } else {
	              var _result2 = this[method].call(this, msg.arg);

	              conn.send({
	                type: 'rpc_response',
	                nonce: msg.nonce,
	                result: _result2
	              });
	              Logger.debug("[".concat(peerid, "] RPC request ").concat(method, " processed, Done"));
	            }

	            break;

	          case 'rpc_response':
	            Logger.debug("[".concat(peerid, "] RPC response received for"), msg.nonce);
	            this.rpcOutstandingCalls_[msg.nonce](msg.result);
	            delete this.rpcOutstandingCalls_[msg.nonce];
	            break;

	          case 'payment':
	            Logger.debug("[".concat(peerid, "] payment received "), msg);
	            this.handlePayment(msg);
	            break;

	          default:
	            Logger.error("[".concat(peerid, "] Unknown message type received: "), msg.type);
	        }
	      }
	    }
	  }, {
	    key: "sendPayment",
	    value: function () {
	      var _sendPayment = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee5(invoice, conn) {
	        var peerid, payment;
	        return regeneratorRuntime.wrap(function _callee5$(_context5) {
	          while (1) {
	            switch (_context5.prev = _context5.next) {
	              case 0:
	                peerid = conn ? conn.peer : null;
	                Logger.debug("[".concat(peerid, "] sendPayment: invoice: "), invoice);
	                _context5.next = 4;
	                return this.context.wallet.createPayment(invoice);

	              case 4:
	                payment = _context5.sent;
	                Logger.debug("[".concat(peerid, "] sendPayment: payment: "), payment);
	                this.context.trigger(ThetaEvents.PAYMENT_SENT, {
	                  payment: payment
	                });
	                this.context.playerStats.sendPayment(payment.amount);

	                if (conn) {
	                  conn.send({
	                    type: 'payment',
	                    payment: this.stringifyBigNumberValues(payment)
	                  });
	                }

	              case 9:
	              case "end":
	                return _context5.stop();
	            }
	          }
	        }, _callee5, this);
	      }));

	      function sendPayment(_x, _x2) {
	        return _sendPayment.apply(this, arguments);
	      }

	      return sendPayment;
	    }()
	  }, {
	    key: "handlePayment",
	    value: function () {
	      var _handlePayment = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee6(msg) {
	        return regeneratorRuntime.wrap(function _callee6$(_context6) {
	          while (1) {
	            switch (_context6.prev = _context6.next) {
	              case 0:
	                _context6.prev = 0;
	                _context6.next = 3;
	                return this.context.wallet.receivePayment(msg.payment);

	              case 3:
	                this.context.trigger(ThetaEvents.PAYMENT_RECEIVED, {
	                  payment: msg.payment
	                });
	                this.context.playerStats.recvPayment(msg.payment.amount);

	                if (msg.payment && msg.payment.error) {
	                  Logger.error('Error in received payment. Skip payment:', msg.payment.error);
	                  this.context.playerStats.walletPaymentError(msg.payment.error);
	                }

	                _context6.next = 11;
	                break;

	              case 8:
	                _context6.prev = 8;
	                _context6.t0 = _context6["catch"](0);
	                Logger.error('Error submitting payment: ', _context6.t0);

	              case 11:
	              case "end":
	                return _context6.stop();
	            }
	          }
	        }, _callee6, this, [[0, 8]]);
	      }));

	      function handlePayment(_x3) {
	        return _handlePayment.apply(this, arguments);
	      }

	      return handlePayment;
	    }() // RPC

	  }, {
	    key: "getFragment",
	    value: function getFragment(args) {
	      var key = args.key;
	      var peerId = args.peer_id;
	      var peerUserID = args.userID;
	      var peerAddress = args.theta_address;
	      var curNum = args.curNum;
	      var totalNum = args.totalNum;

	      if (this.context.cache.has(key)) {
	        var length = this.context.cache.get(key)[0].data.byteLength;
	        var start = Math.floor(length * (curNum / totalNum));
	        var end = Math.floor(length * ((curNum + 1) / totalNum));
	        var data = new Uint8Array(this.context.cache.get(key)[0].data.slice(start, end));
	        var invoice = this.context.wallet.createInvoice(peerUserID, this.videoId);
	        Logger.debug('Fragment found. Sending to peer.');
	        this.context.trigger(ThetaEvents.TRAFFIC, {
	          type: ThetaTrafficType.P2P_OUTBOUND,
	          stats: {
	            size: data.byteLength
	          },
	          peer: {
	            id: peerId,
	            address: peerAddress,
	            userID: peerUserID
	          }
	        });
	        return {
	          type: 'fragment',
	          url: key,
	          result: 'kOK',
	          data: data,
	          invoice: invoice ? this.stringifyBigNumberValues(invoice) : invoice,
	          totalLength: length
	        };
	      }

	      Logger.debug('No cache found for ', key);
	      return {
	        type: 'fragment',
	        url: key,
	        result: 'kNotFound'
	      };
	    } // RPC

	  }, {
	    key: "probeFragment",
	    value: function probeFragment(args) {
	      var key = args.key;

	      if (this.context.cache.has(key)) {
	        Logger.debug("Info peer that fragment ".concat(key, " is found at cache "));
	        return {
	          type: 'fragment',
	          url: key,
	          peerid: this.id,
	          result: 'kOKFound'
	        };
	      }

	      if (!this.hasEnableProbeRace) {
	        Logger.debug("".concat(this.id, " responds NotFound for ").concat(key, " "));
	        return {
	          type: 'fragment',
	          url: key,
	          peerid: this.id,
	          result: 'kNotFound'
	        };
	      }
	    }
	  }, {
	    key: "connectToPeer",
	    value: function connectToPeer(id) {
	      Logger.debug('connectToPeer: ', id);

	      if (id === this.id) {
	        return;
	      }

	      if (!this.peers[id]) {
	        var conn = this.factory.connect(id);

	        if (conn) {
	          this.peers[id] = conn;
	          this.setupPeerConnection(conn);
	          this.updateNumPeers();
	          Logger.debug('Connected to peer: ', id);
	        } else {
	          Logger.error('Failed to connect to peer: ', id);
	        }
	      }
	    }
	  }, {
	    key: "updateNumPeers",
	    value: function updateNumPeers() {
	      Logger.debug('updateNumPeers');
	      var totalPeers = Object.keys(this.peers).length;
	      Logger.debug('updateNumPeers :: totalPeers = ', totalPeers);
	      this.context.trigger(ThetaEvents.PEERS_CHANGED, {
	        totalPeers: totalPeers
	      });
	    }
	  }, {
	    key: "getPeerConfig",
	    value: function getPeerConfig() {
	      var peerConfig = {
	        useCDN: this.useCDN,
	        probeRetry: this.probeRetry,
	        peerReqInterval: this.peerReqInterval,
	        probeTimeout: this.probeTimeout,
	        fragmentTimeout: this.fragmentTimeout,
	        failoverFactor: this.failoverFactor,
	        rangeNumber: this.rangeNumber,
	        segUrlBypassQuery: this.segUrlBypassQuery,
	        probePeerRace: this.hasEnableProbeRace
	      };
	      return peerConfig;
	    } // probe from peers for the fragment with timeout, peers only reply if they
	    // have the fragment and is free to send

	  }, {
	    key: "probeFromPeerWithTimeout",
	    value: function () {
	      var _probeFromPeerWithTimeout2 = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee7(url, timeoutInMs, count, retryTimes) {
	        return regeneratorRuntime.wrap(function _callee7$(_context7) {
	          while (1) {
	            switch (_context7.prev = _context7.next) {
	              case 0:
	                Logger.info('hasEnableProbeRace is:', this.hasEnableProbeRace);

	                if (!this.hasEnableProbeRace) {
	                  _context7.next = 8;
	                  break;
	                }

	                Logger.info("IMPROVE DEBUG [P] - Start probing, retry times: ", retryTimes);
	                _context7.next = 5;
	                return this.probeFromPeerWithRetry(url, timeoutInMs, count, retryTimes);

	              case 5:
	                return _context7.abrupt("return", _context7.sent);

	              case 8:
	                _context7.next = 10;
	                return this._probeFromPeerWithTimeout(url, timeoutInMs);

	              case 10:
	                return _context7.abrupt("return", _context7.sent);

	              case 11:
	              case "end":
	                return _context7.stop();
	            }
	          }
	        }, _callee7, this);
	      }));

	      function probeFromPeerWithTimeout(_x4, _x5, _x6, _x7) {
	        return _probeFromPeerWithTimeout2.apply(this, arguments);
	      }

	      return probeFromPeerWithTimeout;
	    }()
	  }, {
	    key: "probeFromPeerWithRetry",
	    value: function () {
	      var _probeFromPeerWithRetry = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee9(url, timeoutInMs, count, retryTimes) {
	        var _this5 = this;

	        return regeneratorRuntime.wrap(function _callee9$(_context9) {
	          while (1) {
	            switch (_context9.prev = _context9.next) {
	              case 0:
	                _context9.next = 2;
	                return this.simpleProbeFromPeerWithTimeout(url, timeoutInMs, count).then(function (res) {
	                  Logger.info("IMPROVE DEBUG [P] - res in probe, res: ", res);
	                  return Promise.resolve(res);
	                }).catch(
	                /*#__PURE__*/
	                function () {
	                  var _ref = _asyncToGenerator(
	                  /*#__PURE__*/
	                  regeneratorRuntime.mark(function _callee8(err) {
	                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
	                      while (1) {
	                        switch (_context8.prev = _context8.next) {
	                          case 0:
	                            Logger.info("IMPROVE DEBUG [P] - err in probe, res: ", err);

	                            if (!(err.result === 'timeout')) {
	                              _context8.next = 13;
	                              break;
	                            }

	                            Logger.info("IMPROVE DEBUG [P] - Retry count and retry times: ", count, retryTimes);

	                            if (!(count < retryTimes)) {
	                              _context8.next = 9;
	                              break;
	                            }

	                            _context8.next = 6;
	                            return _this5.probeFromPeerWithRetry(url, timeoutInMs, ++count, retryTimes);

	                          case 6:
	                            return _context8.abrupt("return", _context8.sent);

	                          case 9:
	                            Logger.info("IMPROVE DEBUG [P] - Probing got timeout ".concat(count, " times, return a reject"));
	                            return _context8.abrupt("return", Promise.reject(err));

	                          case 11:
	                            _context8.next = 14;
	                            break;

	                          case 13:
	                            return _context8.abrupt("return", Promise.reject(err));

	                          case 14:
	                          case "end":
	                            return _context8.stop();
	                        }
	                      }
	                    }, _callee8);
	                  }));

	                  return function (_x12) {
	                    return _ref.apply(this, arguments);
	                  };
	                }());

	              case 2:
	                return _context9.abrupt("return", _context9.sent);

	              case 3:
	              case "end":
	                return _context9.stop();
	            }
	          }
	        }, _callee9, this);
	      }));

	      function probeFromPeerWithRetry(_x8, _x9, _x10, _x11) {
	        return _probeFromPeerWithRetry.apply(this, arguments);
	      }

	      return probeFromPeerWithRetry;
	    }()
	  }, {
	    key: "simpleProbeFromPeerWithTimeout",
	    value: function () {
	      var _simpleProbeFromPeerWithTimeout = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee10(url, timeoutInMs, count) {
	        var promiseRace, timeout, peerid, conn, resp;
	        return regeneratorRuntime.wrap(function _callee10$(_context10) {
	          while (1) {
	            switch (_context10.prev = _context10.next) {
	              case 0:
	                Logger.debug("probeFromPeerWithTimeout - ");
	                promiseRace = [];
	                timeout = new Promise(function (resolve, reject) {
	                  var id = setTimeout(function () {
	                    clearTimeout(id);
	                    reject({
	                      result: 'timeout'
	                    });
	                  }, timeoutInMs);
	                });
	                promiseRace.push(timeout);

	                if (count === 1) {
	                  this.updateBlackList();
	                }

	                for (peerid in this.peers) {
	                  if (this.blackList[peerid] === undefined) {
	                    conn = this.peers[peerid];
	                    resp = this.makeRPC(conn, 'probeFragment', {
	                      key: url
	                    });
	                    this.context.playerStats.processFragmentReq(peerid, 'probe_req_sent');
	                    promiseRace.push(resp);
	                  } else {
	                    Logger.debug("IMPROVE DEBUG [BL] - forbid probing from a peer in the black list", peerid);
	                  }
	                }

	                Logger.debug("probeFromPeerWithTimeout requests are out and run all starts");
	                _context10.next = 9;
	                return Promise.race(promiseRace).then(function (res) {
	                  Logger.log('SPLIT DEBUG - res in probe:', res);
	                  if (!res) return Promise.reject({
	                    type: 'timeout',
	                    msg: 'ProbeFromPeerWithTimeout ends with timeout'
	                  });else if (res.result === 'kOKFound') return res;
	                });

	              case 9:
	                return _context10.abrupt("return", _context10.sent);

	              case 10:
	              case "end":
	                return _context10.stop();
	            }
	          }
	        }, _callee10, this);
	      }));

	      function simpleProbeFromPeerWithTimeout(_x13, _x14, _x15) {
	        return _simpleProbeFromPeerWithTimeout.apply(this, arguments);
	      }

	      return simpleProbeFromPeerWithTimeout;
	    }()
	  }, {
	    key: "_probeFromPeerWithTimeout",
	    value: function () {
	      var _probeFromPeerWithTimeout3 = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee11(url, timeoutInMs) {
	        var _this6 = this;

	        return regeneratorRuntime.wrap(function _callee11$(_context11) {
	          while (1) {
	            switch (_context11.prev = _context11.next) {
	              case 0:
	                _context11.next = 2;
	                return this.probeFromPeerWithAllReturn(url, timeoutInMs).then(function (res) {
	                  var hasReceived = false;
	                  var result = '';
	                  res.forEach(function (r) {
	                    if (!r.peerid) {
	                      Logger.debug('No peerid', r);
	                    }

	                    if (r.result === 'timeout') {
	                      if (_typeof(result) !== 'object' && r !== 'not catched') result = 'timeout';

	                      _this6.context.playerStats.processFragmentReq(r.peerid, 'probe_req_timeout');
	                    } else if (r.result === 'kNotFound') {
	                      if (_typeof(result) !== 'object') result = 'not catched';

	                      _this6.context.playerStats.processFragmentReq(r.peerid, 'probe_req_not_cached');
	                    } else if (hasReceived) {
	                      _this6.context.playerStats.processFragmentReq(r.peerid, 'probe_req_replied');
	                    } else {
	                      _this6.context.playerStats.processFragmentReq(r.peerid, 'probe_req_replied');

	                      hasReceived = true;
	                      result = Promise.resolve(r);
	                    }
	                  });
	                  if (_typeof(result) === 'object') return result;else if (result === 'timeout') return Promise.reject({
	                    type: 'timeout',
	                    msg: 'ProbeFromPeerWithTimeout ends with ' + result
	                  });else return Promise.reject({
	                    type: 'notCached',
	                    msg: 'ProbeFromPeerWithTimeout ends with ' + result
	                  }); // result = result === '' ? Promise.resolve({ type: 'timeout', msg: 'ProbeFromPeerWithTimeout ends' }) : result;
	                  // return result;
	                }).catch(function (err) {
	                  // Logger.error(`Probe from peer with timeout returns an err: `, err);
	                  return Promise.reject(err);
	                });

	              case 2:
	                return _context11.abrupt("return", _context11.sent);

	              case 3:
	              case "end":
	                return _context11.stop();
	            }
	          }
	        }, _callee11, this);
	      }));

	      function _probeFromPeerWithTimeout(_x16, _x17) {
	        return _probeFromPeerWithTimeout3.apply(this, arguments);
	      }

	      return _probeFromPeerWithTimeout;
	    }()
	  }, {
	    key: "probeFromPeerWithAllReturn",
	    value: function probeFromPeerWithAllReturn(url, timeoutInMs) {
	      var _this7 = this;

	      Logger.debug("probeFromPeerWithTimeout - ");
	      var promiseAll = [];
	      this.updateBlackList();

	      var _loop2 = function _loop2(peerid) {
	        if (_this7.blackList[peerid] === undefined) {
	          var peerPromises = [];
	          var conn = _this7.peers[peerid];

	          var resp = _this7.makeRPC(conn, 'probeFragment', {
	            key: url
	          });

	          _this7.context.playerStats.processFragmentReq(peerid, 'probe_req_sent');

	          var timeout = new Promise(function (resolve, reject) {
	            var id = setTimeout(function () {
	              clearTimeout(id);
	              resolve({
	                result: 'timeout',
	                peerid: peerid
	              });
	            }, timeoutInMs);
	          });
	          peerPromises.push(resp);
	          peerPromises.push(timeout);
	          promiseAll.push(Promise.race(peerPromises));
	        } else {
	          Logger.debug("IMPROVE DEBUG [BL] - forbid probing from a peer in the black list", peerid);
	        } // for (let peerid in this.peers) {
	        //   let peerPromises = [];
	        //   let conn = this.peers[peerid];
	        //   let resp = this.makeRPC(conn, 'probeFragment', { key: url });
	        //   this.context.playerStats.processFragmentReq(peerid, 'probe_req_sent');
	        //   let timeout = new Promise((resolve, reject) => {
	        //     let id = setTimeout(() => {
	        //       clearTimeout(id);
	        //       resolve({ result: 'timeout', peerid });
	        //     }, timeoutInMs);
	        //   });
	        //   peerPromises.push(resp);
	        //   peerPromises.push(timeout);
	        //   promiseAll.push(Promise.race(peerPromises));

	      };

	      for (var peerid in this.peers) {
	        _loop2(peerid);
	      }

	      Logger.debug("probeFromPeerWithTimeout requests are out and run all starts");
	      return Promise.all(promiseAll);
	    } // get fragment from specific peer that responds positively

	  }, {
	    key: "loadFromSpecificPeerWithTimeout",
	    value: function () {
	      var _loadFromSpecificPeerWithTimeout = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee12(url, peerid, fragmentTimeout, totalNum, data) {
	        var _this8 = this;

	        var conn, newTimeout, timeout, thetaAddress, peerPromises, _loop3, i;

	        return regeneratorRuntime.wrap(function _callee12$(_context12) {
	          while (1) {
	            switch (_context12.prev = _context12.next) {
	              case 0:
	                conn = this.peers[peerid];
	                newTimeout = fragmentTimeout ? fragmentTimeout : this.fragmentTimeout;
	                Logger.info('New fragment timeout: ', newTimeout);
	                timeout = new Promise(function (resolve, reject) {
	                  var id = setTimeout(function () {
	                    clearTimeout(id);
	                    reject('Timeout in ' + newTimeout + ' ms.');
	                  }, newTimeout);
	                });
	                thetaAddress = this.context.wallet.account && this.context.wallet.account.recv_account && this.context.wallet.account.recv_account.address;
	                Logger.log('SPLIT DEBUG - theta address:', thetaAddress);
	                peerPromises = [];

	                _loop3 = function _loop3(i) {
	                  // if (i !== 0 && i !== 1 && i !== 3) {
	                  var peerRace = [];
	                  peerRace.push(timeout);
	                  var promise = new Promise(function (resolve, reject) {
	                    setTimeout(function () {
	                      resolve(_this8.getFragmentChunks(conn, url, thetaAddress, i, totalNum, data, Date.now(), newTimeout));
	                    }, i * fragmentTimeout / 10);
	                  });
	                  peerRace.push(promise);
	                  peerPromises.push(Promise.race(peerRace)); // }
	                };

	                for (i = 0; i < totalNum; i++) {
	                  _loop3(i);
	                }

	                Logger.debug("loadFromSpecificPeerWithTimeout starts, peerid=", peerid);
	                return _context12.abrupt("return", Promise.all(peerPromises));

	              case 11:
	              case "end":
	                return _context12.stop();
	            }
	          }
	        }, _callee12, this);
	      }));

	      function loadFromSpecificPeerWithTimeout(_x18, _x19, _x20, _x21, _x22) {
	        return _loadFromSpecificPeerWithTimeout.apply(this, arguments);
	      }

	      return loadFromSpecificPeerWithTimeout;
	    }()
	  }, {
	    key: "getFragmentChunks",
	    value: function () {
	      var _getFragmentChunks = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee13(conn, url, thetaAddress, curNum, totalNum, data, startTime, timeout) {
	        var _this9 = this;

	        return regeneratorRuntime.wrap(function _callee13$(_context13) {
	          while (1) {
	            switch (_context13.prev = _context13.next) {
	              case 0:
	                _context13.next = 2;
	                return this.makeRPC(conn, 'getFragment', {
	                  key: url,
	                  theta_address: thetaAddress,
	                  peer_id: this.id,
	                  userID: this.userId,
	                  totalNum: totalNum,
	                  curNum: curNum
	                }).then(function (res) {
	                  // const self = this;
	                  if (res.result === 'kOK') {
	                    data[curNum] = res.data;

	                    if (!data[totalNum]) {
	                      data[totalNum] = res.totalLength;
	                    } // Logger.log('SPLIT DEBUG - time related:', Date.now() < startTime + timeout, Date.now(), startTime, timeout);


	                    if (_this9._checkData(data)) {
	                      var tmp = data.slice(0, totalNum);
	                      res.data = tmp.reduce(function (sum, tmp) {
	                        return _this9._appendBuffer(sum, tmp);
	                      }, new ArrayBuffer());
	                      Logger.log('IMPROVE DEBUG - res in check data:', res);
	                      return res;
	                    }
	                  }
	                });

	              case 2:
	                return _context13.abrupt("return", _context13.sent);

	              case 3:
	              case "end":
	                return _context13.stop();
	            }
	          }
	        }, _callee13, this);
	      }));

	      function getFragmentChunks(_x23, _x24, _x25, _x26, _x27, _x28, _x29, _x30) {
	        return _getFragmentChunks.apply(this, arguments);
	      }

	      return getFragmentChunks;
	    }() // get fragment from specific peer that responds positively

	  }, {
	    key: "loadFromSpecificPeer",
	    value: function () {
	      var _loadFromSpecificPeer = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee14(url, peerid) {
	        var conn, thetaAddress, resp;
	        return regeneratorRuntime.wrap(function _callee14$(_context14) {
	          while (1) {
	            switch (_context14.prev = _context14.next) {
	              case 0:
	                conn = this.peers[peerid];
	                thetaAddress = this.context.wallet.account && this.context.wallet.account.recv_account && this.context.wallet.account.recv_account.address;
	                _context14.next = 4;
	                return this.makeRPC(conn, 'getFragment', {
	                  key: url,
	                  theta_address: thetaAddress,
	                  peer_id: this.id,
	                  userID: this.userId
	                });

	              case 4:
	                resp = _context14.sent;

	                if (!(resp.result === 'kOK')) {
	                  _context14.next = 10;
	                  break;
	                }

	                //Logger.info("Fragment received from peer - ", conn.peer);
	                this.context.wallet.sendServiceCert(resp.theta_address);
	                return _context14.abrupt("return", resp);

	              case 10:
	                Logger.warn('failed to load fragment from peer', peerid);

	              case 11:
	                return _context14.abrupt("return", {
	                  url: url,
	                  result: 'kNotFound'
	                });

	              case 12:
	              case "end":
	                return _context14.stop();
	            }
	          }
	        }, _callee14, this);
	      }));

	      function loadFromSpecificPeer(_x31, _x32) {
	        return _loadFromSpecificPeer.apply(this, arguments);
	      }

	      return loadFromSpecificPeer;
	    }() // Make RPC to a peer.

	  }, {
	    key: "makeRPC",
	    value: function () {
	      var _makeRPC = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee15(conn, method, arg) {
	        var _this10 = this;

	        var nonce;
	        return regeneratorRuntime.wrap(function _callee15$(_context15) {
	          while (1) {
	            switch (_context15.prev = _context15.next) {
	              case 0:
	                nonce = method + ':' + this.rpcNonce_++;
	                return _context15.abrupt("return", new Promise(function (resolve, reject) {
	                  _this10.rpcOutstandingCalls_[nonce] = resolve;
	                  conn.send({
	                    type: 'rpc_request',
	                    method: method,
	                    arg: arg,
	                    nonce: nonce
	                  });
	                }));

	              case 2:
	              case "end":
	                return _context15.stop();
	            }
	          }
	        }, _callee15, this);
	      }));

	      function makeRPC(_x33, _x34, _x35) {
	        return _makeRPC.apply(this, arguments);
	      }

	      return makeRPC;
	    }()
	  }, {
	    key: "getGeolocation",
	    value: function getGeolocation() {
	      var tmpArr = this.context.playerStats.browserType.split('|');
	      return tmpArr.length > 1 ? JSON.parse(tmpArr[1]) : undefined;
	    }
	  }, {
	    key: "getConnectionType",
	    value: function getConnectionType() {
	      var type = 'unknown';

	      if (navigator.connection) {
	        //Network Information API is supported!
	        type = navigator.connection.type;
	      }

	      return type;
	    }
	  }, {
	    key: "getPeers",
	    value: function () {
	      var _getPeers = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee17() {
	        var _this11 = this;

	        var streamingActive, geoLocation, msg;
	        return regeneratorRuntime.wrap(function _callee17$(_context17) {
	          while (1) {
	            switch (_context17.prev = _context17.next) {
	              case 0:
	                streamingActive = this.context.playerStats.checkActive();

	                if (streamingActive) {
	                  geoLocation = this.getGeolocation();
	                  this.connectionType = this.getConnectionType();
	                  msg = {
	                    id: this.id,
	                    geoLocation: geoLocation,
	                    connectionType: this.connectionType,
	                    userId: this.userId,
	                    videoId: this.videoId
	                  };
	                  Logger.log("getPeers:", msg);
	                  this.hasReceivedPeers = false;
	                  Logger.info('Peers have received status: ' + this.hasReceivedPeers);
	                  this.context.socket.emit('getpeers', msg);
	                  setTimeout(
	                  /*#__PURE__*/
	                  _asyncToGenerator(
	                  /*#__PURE__*/
	                  regeneratorRuntime.mark(function _callee16() {
	                    return regeneratorRuntime.wrap(function _callee16$(_context16) {
	                      while (1) {
	                        switch (_context16.prev = _context16.next) {
	                          case 0:
	                            Logger.info('Peers have received status: ' + _this11.hasReceivedPeers);

	                            if (_this11.hasReceivedPeers) {
	                              _context16.next = 8;
	                              break;
	                            }

	                            Logger.info('Did not receive peers after 5 seconds');

	                            _this11.context.playerStats.resetStats();

	                            _context16.next = 6;
	                            return _this11.joinPeerjsServer();

	                          case 6:
	                            _context16.next = 8;
	                            return _this11.context.socket.emit('join', {
	                              id: _this11.id,
	                              userId: _this11.userId,
	                              videoId: _this11.videoId
	                            });

	                          case 8:
	                          case "end":
	                            return _context16.stop();
	                        }
	                      }
	                    }, _callee16);
	                  })), 5000);
	                } else {
	                  Logger.info("No download during a getPeer period, disconnect from peer server.");
	                  this.context.socket.disconnect();
	                }

	              case 2:
	              case "end":
	                return _context17.stop();
	            }
	          }
	        }, _callee17, this);
	      }));

	      function getPeers() {
	        return _getPeers.apply(this, arguments);
	      }

	      return getPeers;
	    }()
	  }, {
	    key: "_appendBuffer",
	    value: function _appendBuffer(buffer1, buffer2) {
	      if (!buffer1.byteLength) return buffer2;
	      if (!buffer2.byteLength) return buffer1;
	      var tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
	      tmp.set(new Uint8Array(buffer1), 0);
	      tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
	      return tmp.buffer;
	    }
	  }, {
	    key: "shouldSendPayment",
	    value: function shouldSendPayment(data, peerid) {
	      var innerData = data.slice(0);
	      delete innerData[innerData.length - 1];

	      if (!this.receiveMap[[peerid]]) {
	        this.receiveMap[[peerid]] = 0;
	      }

	      Logger.log('SPLIT DEBUG - receive map:', this.receiveMap);
	      Logger.log('SPLIT DEBUG - inner data in should send payment function:', innerData);
	      var totalNum = data.length - 1;
	      var count = 0;
	      innerData.forEach(function (d) {
	        if (d !== undefined) count++;
	      });
	      Logger.log('SPLIT DEBUG - count/totalNum:', count / totalNum);
	      this.receiveMap[[peerid]] += count / totalNum;
	      Logger.log('SPLIT DEBUG - receiveMap after calc:', this.receiveMap);

	      if (this.receiveMap[[peerid]] >= 1) {
	        this.receiveMap[[peerid]]--;
	        return true;
	      } else {
	        return false;
	      }
	    }
	  }, {
	    key: "updateBlackList",
	    value: function updateBlackList() {
	      var _this12 = this;

	      var counterMap = {}; // get counter map

	      Logger.debug('IMPROVE DEBUG [BL] - getFragResults is,', this.getFragResults);
	      this.getFragResults.forEach(function (result) {
	        var id = result.id;

	        if (!counterMap[id]) {
	          counterMap[id] = {
	            'success': 0,
	            'failed': 0,
	            'rate': 0
	          };
	        }

	        if (result.status === 'success') counterMap[id].success += result.segmentNum;else counterMap[id].failed += result.segmentNum;
	        counterMap[id].rate = counterMap[id].success / (counterMap[id].success + counterMap[id].failed);
	      });
	      Logger.debug("IMPROVE DEBUG [BL] - Counter Map :", counterMap);
	      this.counterMap = counterMap;
	      var curTime = Date.now(); // remove peer id from black list after 3 * windowSize mins

	      Object.keys(this.blackList).forEach(function (peer) {
	        if (curTime - _this12.blackList[peer] > 3 * _this12.windowSize * 60 * 1000) {
	          delete _this12.blackList[peer];
	        }
	      });
	      Logger.debug("IMPROVE DEBUG [BL] - Black List after remove:", this.blackList); // check if there's any new peers need to add into black list

	      Object.keys(counterMap).forEach(function (peer) {
	        if (_this12._checkBlackList(counterMap, peer)) {
	          _this12.blackList[peer] = curTime; // remove new item's records in get fragment results map

	          _this12.getFragResults = _this12.getFragResults.filter(function (result) {
	            return result.id !== peer;
	          });
	          Logger.debug("IMPROVE DEBUG [BL] - getFragResults after remove:", _this12.getFragResults);
	        }
	      });
	      Logger.debug("IMPROVE DEBUG [BL] - Final black list:", this.blackList);
	    }
	  }, {
	    key: "updateGetFragResults",
	    value: function updateGetFragResults(peerId, status, counter) {
	      var curTime = Date.now();
	      var expireTime = this.windowSize * 60 * 1000; // contains a 10 mins window

	      var filteredResults = this.getFragResults.filter(function (result) {
	        return curTime - result.timestamp < expireTime;
	      });
	      filteredResults.push({
	        id: peerId,
	        status: status,
	        timestamp: Date.now(),
	        segmentNum: counter
	      });
	      this.getFragResults = filteredResults;
	    }
	  }, {
	    key: "_checkData",
	    value: function _checkData(data) {
	      Logger.debug("IMPROVE DEBUG - data in check data:", data);

	      for (var i = 0; i < data.length; i++) {
	        if (data[i] === undefined) {
	          return false;
	        }
	      }

	      return true;
	    }
	  }, {
	    key: "_checkBlackList",
	    value: function _checkBlackList(counterMap, peer) {
	      if (counterMap[peer].rate <= 0 && counterMap[peer].success + counterMap[peer].failed >= 10 || counterMap[peer].rate <= 0.2 && counterMap[peer].success + counterMap[peer].failed >= 20 || counterMap[peer].rate <= 0.3 && counterMap[peer].success + counterMap[peer].failed >= 30 || counterMap[peer].rate <= 0.4 && counterMap[peer].success + counterMap[peer].failed >= 40 || counterMap[peer].rate <= this.passRate && counterMap[peer].success + counterMap[peer].failed >= this.minBlockNum) {
	        return true;
	      } else return false;
	    }
	  }], [{
	    key: "toggleUseCDN",
	    value: function toggleUseCDN() {
	      isPeeringEnabled = !isPeeringEnabled;
	    }
	  }, {
	    key: "isPeeringEnabled",
	    get: function get() {
	      return isPeeringEnabled;
	    },
	    set: function set(peering) {
	      isPeeringEnabled = peering;
	    }
	  }]);

	  return P2P;
	}();

	var nativeGetOwnPropertyNames = objectGetOwnPropertyNames.f;

	var toString$1 = {}.toString;

	var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
	  ? Object.getOwnPropertyNames(window) : [];

	var getWindowNames = function (it) {
	  try {
	    return nativeGetOwnPropertyNames(it);
	  } catch (error) {
	    return windowNames.slice();
	  }
	};

	// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
	var f$6 = function getOwnPropertyNames(it) {
	  return windowNames && toString$1.call(it) == '[object Window]'
	    ? getWindowNames(it)
	    : nativeGetOwnPropertyNames(toIndexedObject(it));
	};

	var objectGetOwnPropertyNamesExternal = {
		f: f$6
	};

	var f$7 = wellKnownSymbol;

	var wrappedWellKnownSymbol = {
		f: f$7
	};

	var defineProperty$5 = objectDefineProperty.f;

	var defineWellKnownSymbol = function (NAME) {
	  var Symbol = path.Symbol || (path.Symbol = {});
	  if (!has(Symbol, NAME)) defineProperty$5(Symbol, NAME, {
	    value: wrappedWellKnownSymbol.f(NAME)
	  });
	};

	var $forEach$2 = arrayIteration.forEach;

	var HIDDEN = sharedKey('hidden');
	var SYMBOL = 'Symbol';
	var PROTOTYPE$2 = 'prototype';
	var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
	var setInternalState$5 = internalState.set;
	var getInternalState$4 = internalState.getterFor(SYMBOL);
	var ObjectPrototype$2 = Object[PROTOTYPE$2];
	var $Symbol = global_1.Symbol;
	var $stringify = getBuiltIn('JSON', 'stringify');
	var nativeGetOwnPropertyDescriptor$1 = objectGetOwnPropertyDescriptor.f;
	var nativeDefineProperty$1 = objectDefineProperty.f;
	var nativeGetOwnPropertyNames$1 = objectGetOwnPropertyNamesExternal.f;
	var nativePropertyIsEnumerable$1 = objectPropertyIsEnumerable.f;
	var AllSymbols = shared('symbols');
	var ObjectPrototypeSymbols = shared('op-symbols');
	var StringToSymbolRegistry = shared('string-to-symbol-registry');
	var SymbolToStringRegistry = shared('symbol-to-string-registry');
	var WellKnownSymbolsStore$1 = shared('wks');
	var QObject = global_1.QObject;
	// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
	var USE_SETTER = !QObject || !QObject[PROTOTYPE$2] || !QObject[PROTOTYPE$2].findChild;

	// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
	var setSymbolDescriptor = descriptors && fails(function () {
	  return objectCreate(nativeDefineProperty$1({}, 'a', {
	    get: function () { return nativeDefineProperty$1(this, 'a', { value: 7 }).a; }
	  })).a != 7;
	}) ? function (O, P, Attributes) {
	  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor$1(ObjectPrototype$2, P);
	  if (ObjectPrototypeDescriptor) delete ObjectPrototype$2[P];
	  nativeDefineProperty$1(O, P, Attributes);
	  if (ObjectPrototypeDescriptor && O !== ObjectPrototype$2) {
	    nativeDefineProperty$1(ObjectPrototype$2, P, ObjectPrototypeDescriptor);
	  }
	} : nativeDefineProperty$1;

	var wrap = function (tag, description) {
	  var symbol = AllSymbols[tag] = objectCreate($Symbol[PROTOTYPE$2]);
	  setInternalState$5(symbol, {
	    type: SYMBOL,
	    tag: tag,
	    description: description
	  });
	  if (!descriptors) symbol.description = description;
	  return symbol;
	};

	var isSymbol = useSymbolAsUid ? function (it) {
	  return typeof it == 'symbol';
	} : function (it) {
	  return Object(it) instanceof $Symbol;
	};

	var $defineProperty = function defineProperty(O, P, Attributes) {
	  if (O === ObjectPrototype$2) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
	  anObject(O);
	  var key = toPrimitive(P, true);
	  anObject(Attributes);
	  if (has(AllSymbols, key)) {
	    if (!Attributes.enumerable) {
	      if (!has(O, HIDDEN)) nativeDefineProperty$1(O, HIDDEN, createPropertyDescriptor(1, {}));
	      O[HIDDEN][key] = true;
	    } else {
	      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
	      Attributes = objectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
	    } return setSymbolDescriptor(O, key, Attributes);
	  } return nativeDefineProperty$1(O, key, Attributes);
	};

	var $defineProperties = function defineProperties(O, Properties) {
	  anObject(O);
	  var properties = toIndexedObject(Properties);
	  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
	  $forEach$2(keys, function (key) {
	    if (!descriptors || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
	  });
	  return O;
	};

	var $create = function create(O, Properties) {
	  return Properties === undefined ? objectCreate(O) : $defineProperties(objectCreate(O), Properties);
	};

	var $propertyIsEnumerable = function propertyIsEnumerable(V) {
	  var P = toPrimitive(V, true);
	  var enumerable = nativePropertyIsEnumerable$1.call(this, P);
	  if (this === ObjectPrototype$2 && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
	  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
	};

	var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
	  var it = toIndexedObject(O);
	  var key = toPrimitive(P, true);
	  if (it === ObjectPrototype$2 && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
	  var descriptor = nativeGetOwnPropertyDescriptor$1(it, key);
	  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
	    descriptor.enumerable = true;
	  }
	  return descriptor;
	};

	var $getOwnPropertyNames = function getOwnPropertyNames(O) {
	  var names = nativeGetOwnPropertyNames$1(toIndexedObject(O));
	  var result = [];
	  $forEach$2(names, function (key) {
	    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
	  });
	  return result;
	};

	var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
	  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype$2;
	  var names = nativeGetOwnPropertyNames$1(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
	  var result = [];
	  $forEach$2(names, function (key) {
	    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype$2, key))) {
	      result.push(AllSymbols[key]);
	    }
	  });
	  return result;
	};

	// `Symbol` constructor
	// https://tc39.github.io/ecma262/#sec-symbol-constructor
	if (!nativeSymbol) {
	  $Symbol = function Symbol() {
	    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
	    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var tag = uid(description);
	    var setter = function (value) {
	      if (this === ObjectPrototype$2) setter.call(ObjectPrototypeSymbols, value);
	      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
	      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
	    };
	    if (descriptors && USE_SETTER) setSymbolDescriptor(ObjectPrototype$2, tag, { configurable: true, set: setter });
	    return wrap(tag, description);
	  };

	  redefine($Symbol[PROTOTYPE$2], 'toString', function toString() {
	    return getInternalState$4(this).tag;
	  });

	  redefine($Symbol, 'withoutSetter', function (description) {
	    return wrap(uid(description), description);
	  });

	  objectPropertyIsEnumerable.f = $propertyIsEnumerable;
	  objectDefineProperty.f = $defineProperty;
	  objectGetOwnPropertyDescriptor.f = $getOwnPropertyDescriptor;
	  objectGetOwnPropertyNames.f = objectGetOwnPropertyNamesExternal.f = $getOwnPropertyNames;
	  objectGetOwnPropertySymbols.f = $getOwnPropertySymbols;

	  wrappedWellKnownSymbol.f = function (name) {
	    return wrap(wellKnownSymbol(name), name);
	  };

	  if (descriptors) {
	    // https://github.com/tc39/proposal-Symbol-description
	    nativeDefineProperty$1($Symbol[PROTOTYPE$2], 'description', {
	      configurable: true,
	      get: function description() {
	        return getInternalState$4(this).description;
	      }
	    });
	    {
	      redefine(ObjectPrototype$2, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
	    }
	  }
	}

	_export({ global: true, wrap: true, forced: !nativeSymbol, sham: !nativeSymbol }, {
	  Symbol: $Symbol
	});

	$forEach$2(objectKeys(WellKnownSymbolsStore$1), function (name) {
	  defineWellKnownSymbol(name);
	});

	_export({ target: SYMBOL, stat: true, forced: !nativeSymbol }, {
	  // `Symbol.for` method
	  // https://tc39.github.io/ecma262/#sec-symbol.for
	  'for': function (key) {
	    var string = String(key);
	    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
	    var symbol = $Symbol(string);
	    StringToSymbolRegistry[string] = symbol;
	    SymbolToStringRegistry[symbol] = string;
	    return symbol;
	  },
	  // `Symbol.keyFor` method
	  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
	  keyFor: function keyFor(sym) {
	    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
	    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
	  },
	  useSetter: function () { USE_SETTER = true; },
	  useSimple: function () { USE_SETTER = false; }
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol, sham: !descriptors }, {
	  // `Object.create` method
	  // https://tc39.github.io/ecma262/#sec-object.create
	  create: $create,
	  // `Object.defineProperty` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperty
	  defineProperty: $defineProperty,
	  // `Object.defineProperties` method
	  // https://tc39.github.io/ecma262/#sec-object.defineproperties
	  defineProperties: $defineProperties,
	  // `Object.getOwnPropertyDescriptor` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
	  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
	});

	_export({ target: 'Object', stat: true, forced: !nativeSymbol }, {
	  // `Object.getOwnPropertyNames` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
	  getOwnPropertyNames: $getOwnPropertyNames,
	  // `Object.getOwnPropertySymbols` method
	  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
	  getOwnPropertySymbols: $getOwnPropertySymbols
	});

	// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
	// https://bugs.chromium.org/p/v8/issues/detail?id=3443
	_export({ target: 'Object', stat: true, forced: fails(function () { objectGetOwnPropertySymbols.f(1); }) }, {
	  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
	    return objectGetOwnPropertySymbols.f(toObject(it));
	  }
	});

	// `JSON.stringify` method behavior with symbols
	// https://tc39.github.io/ecma262/#sec-json.stringify
	if ($stringify) {
	  var FORCED_JSON_STRINGIFY = !nativeSymbol || fails(function () {
	    var symbol = $Symbol();
	    // MS Edge converts symbol values to JSON as {}
	    return $stringify([symbol]) != '[null]'
	      // WebKit converts symbol values to JSON as null
	      || $stringify({ a: symbol }) != '{}'
	      // V8 throws on boxed symbols
	      || $stringify(Object(symbol)) != '{}';
	  });

	  _export({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
	    // eslint-disable-next-line no-unused-vars
	    stringify: function stringify(it, replacer, space) {
	      var args = [it];
	      var index = 1;
	      var $replacer;
	      while (arguments.length > index) args.push(arguments[index++]);
	      $replacer = replacer;
	      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
	      if (!isArray(replacer)) replacer = function (key, value) {
	        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
	        if (!isSymbol(value)) return value;
	      };
	      args[1] = replacer;
	      return $stringify.apply(null, args);
	    }
	  });
	}

	// `Symbol.prototype[@@toPrimitive]` method
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
	if (!$Symbol[PROTOTYPE$2][TO_PRIMITIVE]) {
	  createNonEnumerableProperty($Symbol[PROTOTYPE$2], TO_PRIMITIVE, $Symbol[PROTOTYPE$2].valueOf);
	}
	// `Symbol.prototype[@@toStringTag]` property
	// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
	setToStringTag($Symbol, SYMBOL);

	hiddenKeys[HIDDEN] = true;

	var defineProperty$6 = objectDefineProperty.f;


	var NativeSymbol = global_1.Symbol;

	if (descriptors && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
	  // Safari 12 bug
	  NativeSymbol().description !== undefined
	)) {
	  var EmptyStringDescriptionStore = {};
	  // wrap Symbol constructor for correct work with undefined description
	  var SymbolWrapper = function Symbol() {
	    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
	    var result = this instanceof SymbolWrapper
	      ? new NativeSymbol(description)
	      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
	      : description === undefined ? NativeSymbol() : NativeSymbol(description);
	    if (description === '') EmptyStringDescriptionStore[result] = true;
	    return result;
	  };
	  copyConstructorProperties(SymbolWrapper, NativeSymbol);
	  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
	  symbolPrototype.constructor = SymbolWrapper;

	  var symbolToString = symbolPrototype.toString;
	  var native = String(NativeSymbol('test')) == 'Symbol(test)';
	  var regexp = /^Symbol\((.*)\)[^)]+$/;
	  defineProperty$6(symbolPrototype, 'description', {
	    configurable: true,
	    get: function description() {
	      var symbol = isObject(this) ? this.valueOf() : this;
	      var string = symbolToString.call(symbol);
	      if (has(EmptyStringDescriptionStore, symbol)) return '';
	      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
	      return desc === '' ? undefined : desc;
	    }
	  });

	  _export({ global: true, forced: true }, {
	    Symbol: SymbolWrapper
	  });
	}

	// `Symbol.iterator` well-known symbol
	// https://tc39.github.io/ecma262/#sec-symbol.iterator
	defineWellKnownSymbol('iterator');

	var $includes$1 = arrayIncludes.includes;


	// `Array.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-array.prototype.includes
	_export({ target: 'Array', proto: true }, {
	  includes: function includes(el /* , fromIndex = 0 */) {
	    return $includes$1(this, el, arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
	addToUnscopables('includes');

	var notARegexp = function (it) {
	  if (isRegexp(it)) {
	    throw TypeError("The method doesn't accept regular expressions");
	  } return it;
	};

	var MATCH$1 = wellKnownSymbol('match');

	var correctIsRegexpLogic = function (METHOD_NAME) {
	  var regexp = /./;
	  try {
	    '/./'[METHOD_NAME](regexp);
	  } catch (e) {
	    try {
	      regexp[MATCH$1] = false;
	      return '/./'[METHOD_NAME](regexp);
	    } catch (f) { /* empty */ }
	  } return false;
	};

	// `String.prototype.includes` method
	// https://tc39.github.io/ecma262/#sec-string.prototype.includes
	_export({ target: 'String', proto: true, forced: !correctIsRegexpLogic('includes') }, {
	  includes: function includes(searchString /* , position = 0 */) {
	    return !!~String(requireObjectCoercible(this))
	      .indexOf(notARegexp(searchString), arguments.length > 1 ? arguments[1] : undefined);
	  }
	});

	// Outputs a plain-old number. If input is undefined or NaN, outputs 0.

	function convertBalance(amountInWei) {
	  return bignumber(amountInWei).dividedBy(1e9).toNumber() || 0;
	}

	var PlayerStats =
	/*#__PURE__*/
	function () {
	  function PlayerStats(context, videoId) {
	    _classCallCheck(this, PlayerStats);

	    this.context = context;
	    this.client_ip = null;
	    this.videoId = videoId;
	    this.browserType = this.getBrowserType(); // this.geoLocation = this.getGeolocation();

	    this.resetStats();
	  }

	  _createClass(PlayerStats, [{
	    key: "start",
	    value: function start() {
	      //TODO need to pass this in?
	      this.peerStatHandle = setInterval(this.reportStats.bind(this), 90000);
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      if (this.peerStatHandle) {
	        clearInterval(this.peerStatHandle);
	      }

	      this.context = null;
	    }
	  }, {
	    key: "setContext",
	    value: function setContext(ctx) {
	      this.context = ctx;
	    }
	  }, {
	    key: "reportStats",
	    value: function reportStats() {
	      this.sendReport(); // Logger.info(`Leaving the peer socket v1--------`);
	      // this.context.socket.disconnect();
	    }
	  }, {
	    key: "checkActive",
	    value: function checkActive() {
	      Logger.info("Checking stats.");
	      Logger.info("num_pre_fragment: ".concat(this.num_pre_fragment, ", num_fragment: ").concat(this.num_fragment));

	      if (this.num_fragment !== 0 && this.num_pre_fragment === this.num_fragment) {
	        return false;
	      } else {
	        this.num_pre_fragment = this.num_fragment;
	        return true;
	      }
	    }
	  }, {
	    key: "setFragmentSize",
	    value: function setFragmentSize(frag_size) {
	      this.fragment_size = frag_size;
	    }
	  }, {
	    key: "processProbeReq",
	    value: function processProbeReq(peer_id, deliTime) {
	      this.avg_probe_reply_time += deliTime;

	      if (deliTime > this.max_probe_reply_time) {
	        this.max_probe_reply_time = deliTime;
	      }

	      if (deliTime < this.min_probe_reply_time) {
	        this.min_probe_reply_time = deliTime;
	      }
	    }
	  }, {
	    key: "addToMap",
	    value: function addToMap(map, id) {
	      // Logger.info(`Stats add to map`, map, id);
	      if (map.has(id)) {
	        var counter = map.get(id);
	        counter++;
	        map.set(id, counter);
	      } else {
	        map.set(id, 1);
	      }
	    }
	  }, {
	    key: "lookupBitrateFromUrl",
	    value: function lookupBitrateFromUrl(url) {
	      var bitrateMap = this.context.p2p.urlBitrateMap;

	      for (var bitrate in bitrateMap) {
	        for (var urlPre in bitrateMap[bitrate]) {
	          if (url.includes(bitrateMap[bitrate][urlPre])) {
	            Logger.info("resolve url=".concat(url, " to bitrate=").concat(bitrate));
	            return bitrate;
	          }
	        }
	      }

	      return undefined;
	    }
	  }, {
	    key: "addBitrateMap",
	    value: function addBitrateMap(url, dataLen, result) {
	      var bitrate = this.lookupBitrateFromUrl(url);

	      if (!bitrate) {
	        Logger.error("error to lookup bitrate for url=".concat(url, " "));
	        return;
	      }

	      switch (result) {
	        case 'fromCDN':
	          if (this.bitrate_from_cdn_map[bitrate] === undefined) {
	            this.bitrate_from_cdn_map[bitrate] = dataLen;
	          } else {
	            this.bitrate_from_cdn_map[bitrate] += dataLen;
	          }

	          break;

	        case 'fromPeer':
	          if (this.bitrate_from_peer_map[bitrate] === undefined) {
	            this.bitrate_from_peer_map[bitrate] = dataLen;
	          } else {
	            this.bitrate_from_peer_map[bitrate] += dataLen;
	          }

	          break;

	        case 'toPeer':
	          if (this.bitrate_to_peer_map[bitrate] === undefined) {
	            this.bitrate_to_peer_map[bitrate] = dataLen;
	          } else {
	            this.bitrate_to_peer_map[bitrate] += dataLen;
	          }

	          break;

	        default:
	          Logger.error("invalid result message for addBitrateMap: ".concat(result));
	      }
	    }
	  }, {
	    key: "processFragmentReq",
	    value: function processFragmentReq(peer_id, result) {
	      switch (result) {
	        // sender
	        case 'probe_req_overview_replied':
	          this.num_probe_req_sent++;
	          this.num_probe_req_replied++;
	          break;

	        case 'probe_req_overview_timeout':
	          this.num_probe_req_sent++;
	          this.num_probe_req_timeout++;
	          break;

	        case 'probe_req_overview_notCached':
	          this.num_probe_req_sent++;
	          this.num_probe_req_notCached++;

	        case 'probe_req_sent':
	          // this.num_probe_req_sent++;
	          this.addToMap(this.probe_sent_map, peer_id);
	          break;

	        case 'probe_req_replied':
	          // this.num_probe_req_replied++;
	          this.addToMap(this.probe_rpl_map, peer_id);
	          break;

	        case 'probe_req_timeout':
	          // this.num_probe_req_timeout++;
	          this.addToMap(this.probe_rpl_timeout_map, peer_id);
	          break;

	        case 'probe_req_not_cached':
	          this.addToMap(this.probe_rpl_not_cache_map, peer_id);
	          break;
	        // receiver

	        case 'probe_req_accept':
	          this.num_probe_req_recv++;
	          this.num_probe_req_accept++;
	          break;

	        case 'probe_req_notFound':
	          this.num_probe_req_recv++;
	          this.num_probe_req_notFound++;
	          break;
	        // sender

	        case 'fragment_req_replied':
	          this.num_fragment_req_sent++;
	          this.num_fragment_req_replied++;

	          if (this.fragment_recv_map.has(peer_id)) {
	            var counter = this.fragment_recv_map.get(peer_id);
	            counter++;
	            this.fragment_recv_map.set(peer_id, counter);
	          } else {
	            this.fragment_recv_map.set(peer_id, 1);
	          }

	          break;

	        case 'fragment_req_rejected':
	          this.num_fragment_req_sent++;
	          this.num_fragment_req_rejected++;
	          break;

	        case 'fragment_req_timeout':
	          this.num_fragment_req_sent++;
	          this.num_fragment_req_timeout++;
	          break;
	        // receiver

	        case 'fragment_req_accept':
	          this.num_fragment_req_recv++;
	          this.num_fragment_req_accept++;

	          if (this.fragment_sent_map.has(peer_id)) {
	            var _counter = this.fragment_sent_map.get(peer_id);

	            _counter++;
	            this.fragment_sent_map.set(peer_id, _counter);
	          } else {
	            this.fragment_sent_map.set(peer_id, 1);
	          }

	          break;

	        case 'fragment_req_notSent':
	          this.num_fragment_req_recv++;
	          this.num_fragment_req_notSent++;
	          break;

	        case 'fragment_req_failSent':
	          this.num_fragment_req_recv++;
	          this.num_fragment_req_failSent++;
	          break;

	        default:
	          Logger.error("invalid result message: ".concat(result));
	      }
	    }
	  }, {
	    key: "processFragment",
	    value: function processFragment(url, source, dataLen, deliTime) {
	      // var strs, fragment_name;
	      var seq_num = 0;
	      var bitrate = 0;

	      if (source === 'toPeer') {
	        this.num_fragment_to_peer++;
	        this.bytes_to_peer += dataLen;
	        this.avg_to_peer_time += deliTime;

	        if (deliTime > this.fragment_size) {
	          this.num_fragment_late_deli_to_peer++;
	        }

	        if (deliTime > this.max_to_peer_time) {
	          this.max_to_peer_time = deliTime;
	        }

	        if (deliTime < this.min_to_peer_time) {
	          this.min_to_peer_time = deliTime;
	        }

	        this.addBitrateMap(url, dataLen, 'toPeer');
	        return;
	      } // TODO: split url, url convention
	      // try {
	      //     strs = url.split('/');
	      //     fragment_name = strs[strs.length - 1];
	      //     seq_num = parseInt(fragment_name.split('.')[0].split('_')[1], 10);
	      //     bitrate = parseInt(strs[6].split('_')[1], 10);
	      // } catch (error) {
	      //     Logger.error(`Error: processFragment, url - ${url}`);
	      //     return;
	      // }


	      if (this.num_fragment === 0) {
	        this.prev_seq = seq_num;
	        this.prev_birate = bitrate;
	      } else {
	        // TODOs: add another sequence check function~~
	        // if ((seq_num - this.prev_seq) > 1) {
	        //     this.num_fragment_missed += (seq_num - this.prev_seq);
	        // } else if ((seq_num - this.prev_seq) <= 0) {
	        //     Logger.error(`Error - processFragment, seq_num out of order - ${seq_num}`);
	        // } else {
	        // }
	        this.prev_seq = seq_num;

	        if (bitrate > this.prev_bitrate) {
	          this.num_bitrate_down++;
	        } else if (bitrate < this.prev_bitrate) {
	          this.num_bitrate_up++;
	        }

	        this.prev_bitrate = bitrate;
	      }

	      if (source === 'fromCDN') {
	        this.num_fragment++;
	        this.num_fragment_from_cdn++;
	        this.bytes_from_cdn += dataLen;
	        this.avg_from_cdn_time += deliTime;

	        if (deliTime > this.max_from_cdn_time) {
	          this.max_from_cdn_time = deliTime;
	        }

	        if (deliTime > this.fragment_size) {
	          this.num_fragment_late_deli_from_cdn++;
	        }

	        if (deliTime < this.min_from_cdn_time) {
	          this.min_from_cdn_time = deliTime;
	        }

	        this.addBitrateMap(url, dataLen, 'fromCDN');
	      } else if (source === 'fromPeer') {
	        this.num_fragment++;
	        this.num_fragment_from_peer++;
	        this.bytes_from_peer += dataLen;
	        this.avg_from_peer_time += deliTime;

	        if (deliTime > this.max_from_peer_time) {
	          this.max_from_peer_time = deliTime;
	        }

	        if (deliTime > this.fragment_size) {
	          this.num_fragment_late_deli_from_peer++;
	        }

	        if (deliTime < this.min_from_peer_time) {
	          this.min_from_peer_time = deliTime;
	        }

	        this.addBitrateMap(url, dataLen, 'fromPeer');
	      } else {
	        Logger.error('fragment source type is wrong');
	      }
	    }
	  }, {
	    key: "sendPayment",
	    value: function sendPayment(amount) {
	      this.num_payment_sent++;
	      this.amount_payment_sent = this.amount_payment_sent.plus(amount);
	    }
	  }, {
	    key: "recvPayment",
	    value: function recvPayment(amount) {
	      this.num_payment_recv++;
	      this.amount_payment_recv = this.amount_payment_recv.plus(amount);
	    } // Record initial balance if it has not been recorded.

	  }, {
	    key: "walletTryRecordInitialBalance",
	    value: function walletTryRecordInitialBalance() {
	      if (this.payment_ra_start_gamma_balance || this.payment_sa_start_gamma_balance) {
	        return;
	      }

	      var tfuel = this.context.wallet.getTFuelBalance();
	      this.payment_sa_start_gamma_balance = tfuel.sa;
	      this.payment_ra_start_gamma_balance = tfuel.ra;
	    }
	  }, {
	    key: "walletRPCSucceeded",
	    value: function walletRPCSucceeded(result) {
	      this.payment_rpc_num_succeeded++;
	      this.payment_rpc_result_map[result] = (this.payment_rpc_result_map[result] || 0) + 1;
	      this.walletTryRecordInitialBalance();
	    }
	  }, {
	    key: "walletRPCFailed",
	    value: function walletRPCFailed(result) {
	      this.payment_rpc_num_failed++;
	      this.payment_rpc_result_map[result] = (this.payment_rpc_result_map[result] || 0) + 1;
	      this.walletTryRecordInitialBalance();
	    }
	  }, {
	    key: "walletPaymentError",
	    value: function walletPaymentError(error) {
	      if (error && error.code) {
	        // Using these unused columns to track payment error:
	        // PAYMENT_ERROR_SERVER_CODE = 1;
	        // PAYMENT_ERROR_NO_AUTH_CODE = 2;
	        // PAYMENT_ERROR_NOT_LOGIN_CODE = 3;
	        // PAYMENT_ERROR_NO_INVOICE_CODE = 4;
	        switch (error.code) {
	          case 1:
	            this.payment_rpc_reserve_succeeded++;
	            break;

	          case 2:
	            this.payment_rpc_reserve_failed++;
	            break;

	          case 3:
	            this.payment_rpc_submit_payment_succeeded++;
	            break;

	          case 4:
	            this.payment_rpc_submit_payment_failed++;
	            break;
	        }
	      }
	    }
	  }, {
	    key: "walletReserveSucceeded",
	    value: function walletReserveSucceeded() {}
	  }, {
	    key: "walletReserveFailed",
	    value: function walletReserveFailed() {}
	  }, {
	    key: "walletSubmitPaymentSucceeded",
	    value: function walletSubmitPaymentSucceeded() {}
	  }, {
	    key: "walletSubmitPaymentFailed",
	    value: function walletSubmitPaymentFailed() {}
	  }, {
	    key: "mapToObj",
	    value: function mapToObj(map) {
	      var obj = {};

	      for (var k in this.context.p2p.peers) {
	        if (map.has(k)) {
	          obj[k] = map.get(k);
	        }
	      }

	      return obj;
	    }
	  }, {
	    key: "packReport",
	    value: function packReport() {
	      var num_peers = Object.keys(this.context.p2p.peers).length;
	      var peer_ids = [];
	      var avg_from_cdn_time = 0;
	      var avg_from_peer_time = 0;
	      var avg_probe_reply_time = 0;
	      var avg_to_peer_time = 0;
	      var fragment_sent_obj = this.mapToObj(this.fragment_sent_map);
	      var fragment_recv_obj = this.mapToObj(this.fragment_recv_map);
	      var probe_sent_obj = this.mapToObj(this.probe_sent_map);
	      var probe_rpl_obj = this.mapToObj(this.probe_rpl_map);
	      var probe_rpl_not_cache_obj = this.mapToObj(this.probe_rpl_not_cache_map);
	      var probe_rpl_timeout_obj = this.mapToObj(this.probe_rpl_timeout_map);

	      for (var k in this.context.p2p.peers) {
	        peer_ids.push(k);
	      }

	      if (this.num_fragment_from_cdn > 0) {
	        avg_from_cdn_time = Math.floor(this.avg_from_cdn_time / this.num_fragment_from_cdn);
	      }

	      if (this.num_fragment_from_peer > 0) {
	        avg_from_peer_time = Math.floor(this.avg_from_peer_time / this.num_fragment_from_peer);
	      }

	      if (this.num_probe_req_replied > 0) {
	        avg_probe_reply_time = Math.floor(this.avg_probe_reply_time / this.num_probe_req_replied);
	      }

	      if (this.num_fragment_to_peer > 0) {
	        avg_to_peer_time = Math.floor(this.avg_to_peer_time / this.num_fragment_to_peer);
	      }

	      this.report_time = Date.now();
	      var tfuel = this.context.wallet.getTFuelBalance();
	      this.payment_sa_end_gamma_balance = tfuel.sa;
	      this.payment_ra_end_gamma_balance = tfuel.ra;
	      return {
	        id: this.context.p2p.id,
	        user_id: this.context.p2p.userId,
	        client_ip: this.client_ip,
	        device_type: this.browserType,
	        video_id: this.videoId,
	        join_time: Math.floor(this.join_time / 1000),
	        report_time: Math.floor(this.report_time / 1000),
	        peer_ids: JSON.stringify(peer_ids),
	        num_peers: num_peers,
	        num_fragment: this.num_fragment,
	        num_fragment_from_cdn: this.num_fragment_from_cdn,
	        num_fragment_from_peer: this.num_fragment_from_peer,
	        num_fragment_to_peer: this.num_fragment_to_peer,
	        num_fragment_missed: this.num_fragment_missed,
	        num_probe_req_sent: this.num_probe_req_sent,
	        num_probe_req_replied: this.num_probe_req_replied,
	        num_probe_req_timeout: this.num_probe_req_timeout,
	        num_fragment_req_sent: this.num_fragment_req_sent,
	        num_fragment_req_replied: this.num_fragment_req_replied,
	        num_fragment_req_rejected: this.num_fragment_req_rejected,
	        num_fragment_req_timeout: this.num_fragment_req_timeout,
	        num_probe_req_recv: this.num_probe_req_recv,
	        num_probe_req_notFound: this.num_probe_req_notFound,
	        num_probe_req_accept: this.num_probe_req_accept,
	        num_fragment_req_recv: this.num_fragment_req_recv,
	        num_fragment_req_notSent: this.num_fragment_req_notSent,
	        num_fragment_req_accept: this.num_fragment_req_accept,
	        num_fragment_req_failSent: this.num_fragment_req_failSent,
	        avg_probe_reply_time: avg_probe_reply_time,
	        max_probe_reply_time: this.max_probe_reply_time,
	        min_probe_reply_time: this.min_probe_reply_time,
	        avg_from_cdn_time: avg_from_cdn_time,
	        max_from_cdn_time: this.max_from_cdn_time,
	        min_from_cdn_time: this.min_from_cdn_time,
	        avg_from_peer_time: avg_from_peer_time,
	        max_from_peer_time: this.max_from_peer_time,
	        min_from_peer_time: this.min_from_peer_time,
	        avg_to_peer_time: avg_to_peer_time,
	        max_to_peer_time: this.max_to_peer_time,
	        min_to_peer_time: this.min_to_peer_time,
	        bytes_from_cdn: this.bytes_from_cdn,
	        bytes_from_peer: this.bytes_from_peer,
	        bytes_to_peer: this.bytes_to_peer,
	        num_bitrate_up: this.num_bitrate_up,
	        num_bitrate_down: this.num_bitrate_down,
	        fragment_size: this.fragment_size,
	        num_fragment_late_deli_from_cdn: this.num_fragment_late_deli_from_cdn,
	        num_fragment_late_deli_from_peer: this.num_fragment_late_deli_from_peer,
	        num_fragment_late_deli_to_peer: this.num_fragment_late_deli_to_peer,
	        fragment_sent_map: JSON.stringify(fragment_sent_obj),
	        fragment_recv_map: JSON.stringify(fragment_recv_obj),
	        num_payment_sent: this.num_payment_sent,
	        num_payment_recv: this.num_payment_recv,
	        amount_payment_sent: convertBalance(this.amount_payment_sent),
	        amount_payment_recv: convertBalance(this.amount_payment_recv),
	        payment_sa_start_gamma_balance: convertBalance(this.payment_sa_start_gamma_balance),
	        payment_ra_start_gamma_balance: convertBalance(this.payment_ra_start_gamma_balance),
	        payment_ra_end_gamma_balance: convertBalance(this.payment_ra_end_gamma_balance),
	        payment_sa_end_gamma_balance: convertBalance(this.payment_sa_end_gamma_balance),
	        payment_rpc_reserve_succeeded: this.payment_rpc_reserve_succeeded,
	        payment_rpc_reserve_failed: this.payment_rpc_reserve_failed,
	        payment_rpc_submit_payment_succeeded: this.payment_rpc_submit_payment_succeeded,
	        payment_rpc_submit_payment_failed: this.payment_rpc_submit_payment_failed,
	        payment_rpc_num_succeeded: this.payment_rpc_num_succeeded,
	        payment_rpc_num_failed: this.payment_rpc_num_failed,
	        payment_rpc_result_map: JSON.stringify(this.payment_rpc_result_map),
	        probe_recv_map: null,
	        probe_recv_not_cache_map: null,
	        probe_sent_map: JSON.stringify(probe_sent_obj),
	        probe_rpl_map: JSON.stringify(probe_rpl_obj),
	        probe_rpl_not_cache_map: JSON.stringify(probe_rpl_not_cache_obj),
	        bitrate_from_cdn_map: JSON.stringify(this.bitrate_from_cdn_map),
	        bitrate_from_peer_map: JSON.stringify(this.bitrate_from_peer_map),
	        bitrate_to_peer_map: JSON.stringify(this.bitrate_to_peer_map)
	      };
	    }
	  }, {
	    key: "resetStats",
	    value: function resetStats() {
	      this.join_time = Date.now();
	      this.report_time = 0;
	      this.num_fragment = 0;
	      this.num_pre_fragment = 0;
	      this.num_fragment_from_cdn = 0;
	      this.num_fragment_from_peer = 0;
	      this.num_fragment_to_peer = 0;
	      this.num_fragment_missed = 0;
	      this.num_probe_req_sent = 0;
	      this.num_probe_req_replied = 0;
	      this.num_probe_req_timeout = 0;
	      this.num_probe_req_notCached = 0;
	      this.num_fragment_req_sent = 0;
	      this.num_fragment_req_replied = 0;
	      this.num_fragment_req_rejected = 0;
	      this.num_fragment_req_timeout = 0;
	      this.num_probe_req_recv = 0;
	      this.num_probe_req_notFound = 0;
	      this.num_probe_req_accept = 0;
	      this.num_fragment_req_recv = 0;
	      this.num_fragment_req_notSent = 0;
	      this.num_fragment_req_accept = 0;
	      this.num_fragment_req_failSent = 0;
	      this.prev_seq_num = null;
	      this.avg_probe_reply_time = 0;
	      this.max_probe_reply_time = 0;
	      this.min_probe_reply_time = 60000;
	      this.avg_from_cdn_time = 0;
	      this.max_from_cdn_time = 0;
	      this.min_from_cdn_time = 60000;
	      this.avg_from_peer_time = 0;
	      this.max_from_peer_time = 0;
	      this.min_from_peer_time = 60000;
	      this.avg_to_peer_time = 0;
	      this.max_to_peer_time = 0;
	      this.min_to_peer_time = 60000;
	      this.bytes_from_cdn = 0;
	      this.bytes_from_peer = 0;
	      this.bytes_to_peer = 0;
	      this.num_bitrate_up = 0;
	      this.num_bitrate_down = 0;
	      this.prev_birate = null;
	      this.fragment_size = 4000; // default is 4 seconds;

	      this.num_fragment_late_deli_from_cdn = 0;
	      this.num_fragment_late_deli_from_peer = 0;
	      this.num_fragment_late_deli_to_peer = 0;
	      this.fragment_sent_map = new Map();
	      this.fragment_recv_map = new Map();
	      this.probe_sent_map = new Map();
	      this.probe_rpl_map = new Map();
	      this.probe_rpl_timeout_map = new Map();
	      this.probe_rpl_not_cache_map = new Map();
	      this.num_payment_sent = 0;
	      this.num_payment_recv = 0;
	      this.amount_payment_sent = bignumber(0);
	      this.amount_payment_recv = bignumber(0);
	      this.payment_ra_start_gamma_balance = undefined;
	      this.payment_sa_start_gamma_balance = undefined;
	      this.payment_ra_end_gamma_balance = undefined;
	      this.payment_sa_end_gamma_balance = undefined;
	      this.walletTryRecordInitialBalance();
	      this.payment_rpc_reserve_succeeded = 0;
	      this.payment_rpc_reserve_failed = 0;
	      this.payment_rpc_submit_payment_succeeded = 0;
	      this.payment_rpc_submit_payment_failed = 0;
	      this.payment_rpc_result_map = {};
	      this.payment_rpc_num_succeeded = 0;
	      this.payment_rpc_num_failed = 0;
	      this.bitrate_from_cdn_map = {};
	      this.bitrate_from_peer_map = {};
	      this.bitrate_to_peer_map = {};
	    }
	  }, {
	    key: "printStats",
	    value: function printStats() {
	      var num_peers = Object.keys(this.context.p2p.peers).length;
	      var peer_ids = [];

	      for (var k in this.context.p2p.peers) {
	        peer_ids.push(k);
	      }

	      this.report_time = Date.now();
	      Logger.info('client_ip - ', this.client_ip);
	      Logger.info('id - ', this.context.p2p.id);
	      Logger.info('browserType - ', this.browserType);
	      Logger.info('videoId - ', this.videoId);
	      Logger.info('join_time -', new Date(this.join_time));
	      Logger.info('report_time -', new Date(this.report_time));
	      Logger.info('peer_ids - ', peer_ids);
	      Logger.info('num_peers - ', num_peers);
	      Logger.info('---- sender stats ----');
	      Logger.info('num_probe_req_sent - ', this.num_probe_req_sent);
	      Logger.info('num_probe_req_replied', this.num_probe_req_replied);
	      Logger.info('num_probe_req_timeout - ', this.num_probe_req_timeout);
	      Logger.info('num_probe_req_notCached -', this.num_probe_req_notCached);
	      Logger.info('num_fragment_req_sent - ', this.num_fragment_req_sent);
	      Logger.info('num_fragment_req_timeout', this.num_fragment_req_timeout);
	      Logger.info('num_fragment_req_rejected', this.num_fragment_req_rejected);
	      Logger.info('num_fragment_req_replied', this.num_fragment_req_replied);
	      Logger.info('num_fragment -', this.num_fragment);
	      Logger.info('num_fragment_from_cdn -', this.num_fragment_from_cdn);
	      Logger.info('num_fragment_from_peer -', this.num_fragment_from_peer);
	      Logger.info('num_fragment_missed -', this.num_fragment_missed);
	      Logger.info('bytes_from_cdn -', this.bytes_from_cdn);
	      Logger.info('bytes_from_peer -', this.bytes_from_peer);
	      Logger.info('num_fragment_late_deli_from_cdn - ', this.num_fragment_late_deli_from_cdn);
	      Logger.info('num_fragment_late_deli_from_peer - ', this.num_fragment_late_deli_from_peer);
	      Logger.info('max_from_cdn_time - ', this.max_from_cdn_time);
	      Logger.info('min_from_cdn_time - ', this.min_from_cdn_time);
	      Logger.info('max_from_peer_time - ', this.max_from_peer_time);
	      Logger.info('min_from_peer_time - ', this.min_from_peer_time);
	      Logger.info('max_probe_reply_time - ', this.max_probe_reply_time);
	      Logger.info('min_probe_reply_time - ', this.min_probe_reply_time);

	      if (this.num_fragment_from_cdn > 0) {
	        Logger.info('avg_from_cdn_time - ', this.avg_from_cdn_time / this.num_fragment_from_cdn);
	      }

	      if (this.num_fragment_from_peer > 0) {
	        Logger.info('avg_from_peer_time - ', this.avg_from_peer_time / this.num_fragment_from_peer);
	      }

	      if (this.num_probe_req_replied > 0) {
	        Logger.info('avg_probe_reply_time - ', this.avg_probe_reply_time / this.num_probe_req_replied);
	      }

	      Logger.info('---- receiver stats ----');
	      Logger.info('num_probe_req_recv - ', this.num_probe_req_recv);
	      Logger.info('num_probe_req_accept - ', this.num_probe_req_accept);
	      Logger.info('num_probe_req_notFound - ', this.num_probe_req_notFound);
	      Logger.info('num_fragment_req_recv - ', this.num_fragment_req_recv);
	      Logger.info('num_fragment_req_accept - ', this.num_fragment_req_accept);
	      Logger.info('num_fragment_req_notSent - ', this.num_fragment_req_notSent);
	      Logger.info('num_fragment_req_failSent - ', this.num_fragment_req_failSent);
	      Logger.info('num_fragment_to_peer -', this.num_fragment_to_peer);
	      Logger.info('bytes_to_peer -', this.bytes_to_peer);
	      Logger.info('num_fragment_late_deli_to_peer - ', this.num_fragment_late_deli_to_peer);
	      Logger.info('max_to_peer_time - ', this.max_to_peer_time);
	      Logger.info('min_to_peer_time - ', this.min_to_peer_time);

	      if (this.num_fragment_to_peer > 0) {
	        Logger.info('avg_to_peer_time - ', this.avg_to_peer_time / this.num_fragment_to_peer);
	      }

	      Logger.info('---- probe sent counter map ----');
	      var _iteratorNormalCompletion = true;
	      var _didIteratorError = false;
	      var _iteratorError = undefined;

	      try {
	        for (var _iterator = this.probe_sent_map[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	          var _step$value = _slicedToArray(_step.value, 2),
	              _k = _step$value[0],
	              v = _step$value[1];

	          Logger.info(_k, v);
	        }
	      } catch (err) {
	        _didIteratorError = true;
	        _iteratorError = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion && _iterator.return != null) {
	            _iterator.return();
	          }
	        } finally {
	          if (_didIteratorError) {
	            throw _iteratorError;
	          }
	        }
	      }

	      Logger.info('---- probe got replied counter map ----');
	      var _iteratorNormalCompletion2 = true;
	      var _didIteratorError2 = false;
	      var _iteratorError2 = undefined;

	      try {
	        for (var _iterator2 = this.probe_rpl_map[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
	          var _step2$value = _slicedToArray(_step2.value, 2),
	              _k2 = _step2$value[0],
	              _v = _step2$value[1];

	          Logger.info(_k2, _v);
	        }
	      } catch (err) {
	        _didIteratorError2 = true;
	        _iteratorError2 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
	            _iterator2.return();
	          }
	        } finally {
	          if (_didIteratorError2) {
	            throw _iteratorError2;
	          }
	        }
	      }

	      Logger.info('---- probe got replied not cached counter map ----');
	      var _iteratorNormalCompletion3 = true;
	      var _didIteratorError3 = false;
	      var _iteratorError3 = undefined;

	      try {
	        for (var _iterator3 = this.probe_rpl_not_cache_map[Symbol.iterator](), _step3; !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
	          var _step3$value = _slicedToArray(_step3.value, 2),
	              _k3 = _step3$value[0],
	              _v2 = _step3$value[1];

	          Logger.info(_k3, _v2);
	        }
	      } catch (err) {
	        _didIteratorError3 = true;
	        _iteratorError3 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion3 && _iterator3.return != null) {
	            _iterator3.return();
	          }
	        } finally {
	          if (_didIteratorError3) {
	            throw _iteratorError3;
	          }
	        }
	      }

	      Logger.info('---- probe got replied timeout counter map ----');
	      var _iteratorNormalCompletion4 = true;
	      var _didIteratorError4 = false;
	      var _iteratorError4 = undefined;

	      try {
	        for (var _iterator4 = this.probe_rpl_timeout_map[Symbol.iterator](), _step4; !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
	          var _step4$value = _slicedToArray(_step4.value, 2),
	              _k4 = _step4$value[0],
	              _v3 = _step4$value[1];

	          Logger.info(_k4, _v3);
	        }
	      } catch (err) {
	        _didIteratorError4 = true;
	        _iteratorError4 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion4 && _iterator4.return != null) {
	            _iterator4.return();
	          }
	        } finally {
	          if (_didIteratorError4) {
	            throw _iteratorError4;
	          }
	        }
	      }

	      Logger.info('---- recv counter map ----');
	      var _iteratorNormalCompletion5 = true;
	      var _didIteratorError5 = false;
	      var _iteratorError5 = undefined;

	      try {
	        for (var _iterator5 = this.fragment_recv_map[Symbol.iterator](), _step5; !(_iteratorNormalCompletion5 = (_step5 = _iterator5.next()).done); _iteratorNormalCompletion5 = true) {
	          var _step5$value = _slicedToArray(_step5.value, 2),
	              _k5 = _step5$value[0],
	              _v4 = _step5$value[1];

	          Logger.info(_k5, _v4);
	        }
	      } catch (err) {
	        _didIteratorError5 = true;
	        _iteratorError5 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion5 && _iterator5.return != null) {
	            _iterator5.return();
	          }
	        } finally {
	          if (_didIteratorError5) {
	            throw _iteratorError5;
	          }
	        }
	      }

	      Logger.info('---- sent counter map ----');
	      var _iteratorNormalCompletion6 = true;
	      var _didIteratorError6 = false;
	      var _iteratorError6 = undefined;

	      try {
	        for (var _iterator6 = this.fragment_sent_map[Symbol.iterator](), _step6; !(_iteratorNormalCompletion6 = (_step6 = _iterator6.next()).done); _iteratorNormalCompletion6 = true) {
	          var _step6$value = _slicedToArray(_step6.value, 2),
	              _k6 = _step6$value[0],
	              _v5 = _step6$value[1];

	          Logger.info(_k6, _v5);
	        }
	      } catch (err) {
	        _didIteratorError6 = true;
	        _iteratorError6 = err;
	      } finally {
	        try {
	          if (!_iteratorNormalCompletion6 && _iterator6.return != null) {
	            _iterator6.return();
	          }
	        } finally {
	          if (_didIteratorError6) {
	            throw _iteratorError6;
	          }
	        }
	      }

	      Logger.info('---- birate counter map ----');
	      Logger.info("bitrate_from_cdn_map: ".concat(JSON.stringify(this.bitrate_from_cdn_map)));
	      Logger.info("bitrate_from_peer_map: ".concat(JSON.stringify(this.bitrate_from_peer_map)));
	      Logger.info("bitrate_to_peer_map: ".concat(JSON.stringify(this.bitrate_to_peer_map)));
	    }
	  }, {
	    key: "sendReport",
	    value: function () {
	      var _sendReport = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee() {
	        var _this = this;

	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                return _context.abrupt("return", new Promise(function (resolve, reject) {
	                  Logger.info('---- player stats report ----');

	                  try {
	                    var stats_report = _this.packReport();

	                    _this.context.socket.emit('clientstats', stats_report);

	                    if (Logger.isLoggingEnabled()) {
	                      _this.printStats();
	                    }

	                    resolve('reporting done successfully');
	                  } catch (err) {
	                    Logger.error("Exception: error message - ".concat(err.message));
	                    reject(err.message);
	                  }
	                }));

	              case 1:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee);
	      }));

	      function sendReport() {
	        return _sendReport.apply(this, arguments);
	      }

	      return sendReport;
	    }()
	  }, {
	    key: "getDeviceType",
	    value: function getDeviceType() {
	      var device = '';

	      if (navigator.userAgent) {
	        if (navigator.userAgent.match(/mobile/i)) {
	          device = 'Mobile';
	        } else if (navigator.userAgent.match(/iPad|Android|Touch/i)) {
	          device = 'Tablet';
	        } else {
	          device = 'Desktop';
	        }
	      }

	      return device;
	    }
	  }, {
	    key: "getBrowserType",
	    value: function getBrowserType() {
	      var browserType = 'unknown';

	      if ((navigator.userAgent.indexOf('Opera') || navigator.userAgent.indexOf('OPR')) !== -1) {
	        browserType = 'Opera';
	      } else if (navigator.userAgent.indexOf('Chrome') !== -1) {
	        browserType = 'Chrome';
	      } else if (navigator.userAgent.indexOf('Safari') !== -1) {
	        browserType = 'Safari';
	      } else if (navigator.userAgent.indexOf('Firefox') !== -1) {
	        browserType = 'Firefox';
	      } else if (navigator.userAgent.indexOf('MSIE') !== -1 || !!document.documentMode === true) {
	        // IF IE > 10
	        browserType = 'IE';
	      } else {
	        Logger.warn('Unknown browser type');
	      }

	      if (this.context.config.allowGeoLocation === true) {
	        this.getGeoLocation();
	      }

	      var device = this.getDeviceType();
	      return device + ':' + browserType;
	    }
	  }, {
	    key: "getGeoLocation",
	    value: function getGeoLocation() {
	      var options = {
	        enableHighAccuracy: true,
	        // timeout: 5000,
	        maximumAge: 50000
	      };

	      if (navigator.geolocation) {
	        navigator.geolocation.getCurrentPosition(sendPosition.bind(this), handleError.bind(this), options);
	      } else {
	        var msg = 'Geolocation is not supported by this browser.';
	        Logger.warn("[Geolocation frontend] " + msg);
	        var geolocation = {
	          type: 'error',
	          data: msg
	        };
	        this.browserType += '|' + JSON.stringify(geolocation);
	      }

	      function sendPosition(position) {
	        Logger.info('[Geolocation frontend] v1');
	        Logger.info(position);
	        var geolocation = {
	          type: 'success',
	          data: {
	            coords: {
	              accuracy: position.coords.accuracy,
	              latitude: position.coords.latitude,
	              longitude: position.coords.longitude
	            },
	            timestamp: position.timestamp
	          }
	        };
	        this.browserType += '|' + JSON.stringify(geolocation);
	        Logger.info('brower type: ' + this.browserType);
	        Logger.info(geolocation);
	      }

	      function handleError(error) {
	        var msg = '';

	        switch (error.code) {
	          case error.PERMISSION_DENIED:
	            msg = 'User denied the request for Geolocation.';
	            break;

	          case error.POSITION_UNAVAILABLE:
	            msg = 'Location information is unavailable.';
	            break;

	          case error.TIMEOUT:
	            msg = 'The request to get user location timed out.';
	            break;

	          case error.UNKNOWN_ERROR:
	            msg = 'An unknown error occurred.';
	            break;
	        }

	        Logger.warn("[Geolocation frontend] " + msg);
	        var geolocation = {
	          type: 'error',
	          data: msg
	        };
	        this.browserType += '|' + JSON.stringify(geolocation);
	      }
	    }
	  }]);

	  return PlayerStats;
	}();

	var thetaDefaultConfig = {
	  videoID: null,
	  userID: null,
	  wallet: null,
	  trackerServer: {
	    host: 'beta-grouping-1.sliver.tv',
	    port: 8700,
	    secure: true,
	    path: ''
	  },
	  peerServer: {
	    host: 'beta-grouping-1.sliver.tv',
	    port: 8700,
	    secure: true,
	    path: '/'
	  },
	  useCDN: false,
	  fragmentSize: 6000,
	  failoverFactor: 0.7,
	  statsReportInterval: 90000,
	  peerReqInterval: 120000,
	  probeTimeout: 600,
	  fragmentTimeout: 3000,
	  maxConcurrentPeerTxs: 1,
	  allowGeoLocation: false,
	  allowRangeRequests: true,
	  debug: false
	};

	/**
	 * Parses an URI
	 *
	 * @author Steven Levithan <stevenlevithan.com> (MIT license)
	 * @api private
	 */

	var re = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;

	var parts = [
	    'source', 'protocol', 'authority', 'userInfo', 'user', 'password', 'host', 'port', 'relative', 'path', 'directory', 'file', 'query', 'anchor'
	];

	var parseuri = function parseuri(str) {
	    var src = str,
	        b = str.indexOf('['),
	        e = str.indexOf(']');

	    if (b != -1 && e != -1) {
	        str = str.substring(0, b) + str.substring(b, e).replace(/:/g, ';') + str.substring(e, str.length);
	    }

	    var m = re.exec(str || ''),
	        uri = {},
	        i = 14;

	    while (i--) {
	        uri[parts[i]] = m[i] || '';
	    }

	    if (b != -1 && e != -1) {
	        uri.source = src;
	        uri.host = uri.host.substring(1, uri.host.length - 1).replace(/;/g, ':');
	        uri.authority = uri.authority.replace('[', '').replace(']', '').replace(/;/g, ':');
	        uri.ipv6uri = true;
	    }

	    return uri;
	};

	/**
	 * Helpers.
	 */

	var s = 1000;
	var m = s * 60;
	var h = m * 60;
	var d = h * 24;
	var y = d * 365.25;

	/**
	 * Parse or format the given `val`.
	 *
	 * Options:
	 *
	 *  - `long` verbose formatting [false]
	 *
	 * @param {String|Number} val
	 * @param {Object} [options]
	 * @throws {Error} throw an error if val is not a non-empty string or a number
	 * @return {String|Number}
	 * @api public
	 */

	var ms = function(val, options) {
	  options = options || {};
	  var type = typeof val;
	  if (type === 'string' && val.length > 0) {
	    return parse(val);
	  } else if (type === 'number' && isNaN(val) === false) {
	    return options.long ? fmtLong(val) : fmtShort(val);
	  }
	  throw new Error(
	    'val is not a non-empty string or a valid number. val=' +
	      JSON.stringify(val)
	  );
	};

	/**
	 * Parse the given `str` and return milliseconds.
	 *
	 * @param {String} str
	 * @return {Number}
	 * @api private
	 */

	function parse(str) {
	  str = String(str);
	  if (str.length > 100) {
	    return;
	  }
	  var match = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(
	    str
	  );
	  if (!match) {
	    return;
	  }
	  var n = parseFloat(match[1]);
	  var type = (match[2] || 'ms').toLowerCase();
	  switch (type) {
	    case 'years':
	    case 'year':
	    case 'yrs':
	    case 'yr':
	    case 'y':
	      return n * y;
	    case 'days':
	    case 'day':
	    case 'd':
	      return n * d;
	    case 'hours':
	    case 'hour':
	    case 'hrs':
	    case 'hr':
	    case 'h':
	      return n * h;
	    case 'minutes':
	    case 'minute':
	    case 'mins':
	    case 'min':
	    case 'm':
	      return n * m;
	    case 'seconds':
	    case 'second':
	    case 'secs':
	    case 'sec':
	    case 's':
	      return n * s;
	    case 'milliseconds':
	    case 'millisecond':
	    case 'msecs':
	    case 'msec':
	    case 'ms':
	      return n;
	    default:
	      return undefined;
	  }
	}

	/**
	 * Short format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtShort(ms) {
	  if (ms >= d) {
	    return Math.round(ms / d) + 'd';
	  }
	  if (ms >= h) {
	    return Math.round(ms / h) + 'h';
	  }
	  if (ms >= m) {
	    return Math.round(ms / m) + 'm';
	  }
	  if (ms >= s) {
	    return Math.round(ms / s) + 's';
	  }
	  return ms + 'ms';
	}

	/**
	 * Long format for `ms`.
	 *
	 * @param {Number} ms
	 * @return {String}
	 * @api private
	 */

	function fmtLong(ms) {
	  return plural(ms, d, 'day') ||
	    plural(ms, h, 'hour') ||
	    plural(ms, m, 'minute') ||
	    plural(ms, s, 'second') ||
	    ms + ' ms';
	}

	/**
	 * Pluralization helper.
	 */

	function plural(ms, n, name) {
	  if (ms < n) {
	    return;
	  }
	  if (ms < n * 1.5) {
	    return Math.floor(ms / n) + ' ' + name;
	  }
	  return Math.ceil(ms / n) + ' ' + name + 's';
	}

	var debug = createCommonjsModule(function (module, exports) {
	/**
	 * This is the common logic for both the Node.js and web browser
	 * implementations of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = createDebug.debug = createDebug['default'] = createDebug;
	exports.coerce = coerce;
	exports.disable = disable;
	exports.enable = enable;
	exports.enabled = enabled;
	exports.humanize = ms;

	/**
	 * Active `debug` instances.
	 */
	exports.instances = [];

	/**
	 * The currently active debug mode names, and names to skip.
	 */

	exports.names = [];
	exports.skips = [];

	/**
	 * Map of special "%n" handling functions, for the debug "format" argument.
	 *
	 * Valid key names are a single, lower or upper-case letter, i.e. "n" and "N".
	 */

	exports.formatters = {};

	/**
	 * Select a color.
	 * @param {String} namespace
	 * @return {Number}
	 * @api private
	 */

	function selectColor(namespace) {
	  var hash = 0, i;

	  for (i in namespace) {
	    hash  = ((hash << 5) - hash) + namespace.charCodeAt(i);
	    hash |= 0; // Convert to 32bit integer
	  }

	  return exports.colors[Math.abs(hash) % exports.colors.length];
	}

	/**
	 * Create a debugger with the given `namespace`.
	 *
	 * @param {String} namespace
	 * @return {Function}
	 * @api public
	 */

	function createDebug(namespace) {

	  var prevTime;

	  function debug() {
	    // disabled?
	    if (!debug.enabled) return;

	    var self = debug;

	    // set `diff` timestamp
	    var curr = +new Date();
	    var ms = curr - (prevTime || curr);
	    self.diff = ms;
	    self.prev = prevTime;
	    self.curr = curr;
	    prevTime = curr;

	    // turn the `arguments` into a proper Array
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }

	    args[0] = exports.coerce(args[0]);

	    if ('string' !== typeof args[0]) {
	      // anything else let's inspect with %O
	      args.unshift('%O');
	    }

	    // apply any `formatters` transformations
	    var index = 0;
	    args[0] = args[0].replace(/%([a-zA-Z%])/g, function(match, format) {
	      // if we encounter an escaped % then don't increase the array index
	      if (match === '%%') return match;
	      index++;
	      var formatter = exports.formatters[format];
	      if ('function' === typeof formatter) {
	        var val = args[index];
	        match = formatter.call(self, val);

	        // now we need to remove `args[index]` since it's inlined in the `format`
	        args.splice(index, 1);
	        index--;
	      }
	      return match;
	    });

	    // apply env-specific formatting (colors, etc.)
	    exports.formatArgs.call(self, args);

	    var logFn = debug.log || exports.log || console.log.bind(console);
	    logFn.apply(self, args);
	  }

	  debug.namespace = namespace;
	  debug.enabled = exports.enabled(namespace);
	  debug.useColors = exports.useColors();
	  debug.color = selectColor(namespace);
	  debug.destroy = destroy;

	  // env-specific initialization logic for debug instances
	  if ('function' === typeof exports.init) {
	    exports.init(debug);
	  }

	  exports.instances.push(debug);

	  return debug;
	}

	function destroy () {
	  var index = exports.instances.indexOf(this);
	  if (index !== -1) {
	    exports.instances.splice(index, 1);
	    return true;
	  } else {
	    return false;
	  }
	}

	/**
	 * Enables a debug mode by namespaces. This can include modes
	 * separated by a colon and wildcards.
	 *
	 * @param {String} namespaces
	 * @api public
	 */

	function enable(namespaces) {
	  exports.save(namespaces);

	  exports.names = [];
	  exports.skips = [];

	  var i;
	  var split = (typeof namespaces === 'string' ? namespaces : '').split(/[\s,]+/);
	  var len = split.length;

	  for (i = 0; i < len; i++) {
	    if (!split[i]) continue; // ignore empty strings
	    namespaces = split[i].replace(/\*/g, '.*?');
	    if (namespaces[0] === '-') {
	      exports.skips.push(new RegExp('^' + namespaces.substr(1) + '$'));
	    } else {
	      exports.names.push(new RegExp('^' + namespaces + '$'));
	    }
	  }

	  for (i = 0; i < exports.instances.length; i++) {
	    var instance = exports.instances[i];
	    instance.enabled = exports.enabled(instance.namespace);
	  }
	}

	/**
	 * Disable debug output.
	 *
	 * @api public
	 */

	function disable() {
	  exports.enable('');
	}

	/**
	 * Returns true if the given mode name is enabled, false otherwise.
	 *
	 * @param {String} name
	 * @return {Boolean}
	 * @api public
	 */

	function enabled(name) {
	  if (name[name.length - 1] === '*') {
	    return true;
	  }
	  var i, len;
	  for (i = 0, len = exports.skips.length; i < len; i++) {
	    if (exports.skips[i].test(name)) {
	      return false;
	    }
	  }
	  for (i = 0, len = exports.names.length; i < len; i++) {
	    if (exports.names[i].test(name)) {
	      return true;
	    }
	  }
	  return false;
	}

	/**
	 * Coerce `val`.
	 *
	 * @param {Mixed} val
	 * @return {Mixed}
	 * @api private
	 */

	function coerce(val) {
	  if (val instanceof Error) return val.stack || val.message;
	  return val;
	}
	});
	var debug_1 = debug.coerce;
	var debug_2 = debug.disable;
	var debug_3 = debug.enable;
	var debug_4 = debug.enabled;
	var debug_5 = debug.humanize;
	var debug_6 = debug.instances;
	var debug_7 = debug.names;
	var debug_8 = debug.skips;
	var debug_9 = debug.formatters;

	var browser = createCommonjsModule(function (module, exports) {
	/**
	 * This is the web browser implementation of `debug()`.
	 *
	 * Expose `debug()` as the module.
	 */

	exports = module.exports = debug;
	exports.log = log;
	exports.formatArgs = formatArgs;
	exports.save = save;
	exports.load = load;
	exports.useColors = useColors;
	exports.storage = 'undefined' != typeof chrome
	               && 'undefined' != typeof chrome.storage
	                  ? chrome.storage.local
	                  : localstorage();

	/**
	 * Colors.
	 */

	exports.colors = [
	  '#0000CC', '#0000FF', '#0033CC', '#0033FF', '#0066CC', '#0066FF', '#0099CC',
	  '#0099FF', '#00CC00', '#00CC33', '#00CC66', '#00CC99', '#00CCCC', '#00CCFF',
	  '#3300CC', '#3300FF', '#3333CC', '#3333FF', '#3366CC', '#3366FF', '#3399CC',
	  '#3399FF', '#33CC00', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#33CCFF',
	  '#6600CC', '#6600FF', '#6633CC', '#6633FF', '#66CC00', '#66CC33', '#9900CC',
	  '#9900FF', '#9933CC', '#9933FF', '#99CC00', '#99CC33', '#CC0000', '#CC0033',
	  '#CC0066', '#CC0099', '#CC00CC', '#CC00FF', '#CC3300', '#CC3333', '#CC3366',
	  '#CC3399', '#CC33CC', '#CC33FF', '#CC6600', '#CC6633', '#CC9900', '#CC9933',
	  '#CCCC00', '#CCCC33', '#FF0000', '#FF0033', '#FF0066', '#FF0099', '#FF00CC',
	  '#FF00FF', '#FF3300', '#FF3333', '#FF3366', '#FF3399', '#FF33CC', '#FF33FF',
	  '#FF6600', '#FF6633', '#FF9900', '#FF9933', '#FFCC00', '#FFCC33'
	];

	/**
	 * Currently only WebKit-based Web Inspectors, Firefox >= v31,
	 * and the Firebug extension (any Firefox version) are known
	 * to support "%c" CSS customizations.
	 *
	 * TODO: add a `localStorage` variable to explicitly enable/disable colors
	 */

	function useColors() {
	  // NB: In an Electron preload script, document will be defined but not fully
	  // initialized. Since we know we're in Chrome, we'll just detect this case
	  // explicitly
	  if (typeof window !== 'undefined' && window.process && window.process.type === 'renderer') {
	    return true;
	  }

	  // Internet Explorer and Edge do not support colors.
	  if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) {
	    return false;
	  }

	  // is webkit? http://stackoverflow.com/a/16459606/376773
	  // document is undefined in react-native: https://github.com/facebook/react-native/pull/1632
	  return (typeof document !== 'undefined' && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance) ||
	    // is firebug? http://stackoverflow.com/a/398120/376773
	    (typeof window !== 'undefined' && window.console && (window.console.firebug || (window.console.exception && window.console.table))) ||
	    // is firefox >= v31?
	    // https://developer.mozilla.org/en-US/docs/Tools/Web_Console#Styling_messages
	    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31) ||
	    // double check webkit in userAgent just in case we are in a worker
	    (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/));
	}

	/**
	 * Map %j to `JSON.stringify()`, since no Web Inspectors do that by default.
	 */

	exports.formatters.j = function(v) {
	  try {
	    return JSON.stringify(v);
	  } catch (err) {
	    return '[UnexpectedJSONParseError]: ' + err.message;
	  }
	};


	/**
	 * Colorize log arguments if enabled.
	 *
	 * @api public
	 */

	function formatArgs(args) {
	  var useColors = this.useColors;

	  args[0] = (useColors ? '%c' : '')
	    + this.namespace
	    + (useColors ? ' %c' : ' ')
	    + args[0]
	    + (useColors ? '%c ' : ' ')
	    + '+' + exports.humanize(this.diff);

	  if (!useColors) return;

	  var c = 'color: ' + this.color;
	  args.splice(1, 0, c, 'color: inherit');

	  // the final "%c" is somewhat tricky, because there could be other
	  // arguments passed either before or after the %c, so we need to
	  // figure out the correct index to insert the CSS into
	  var index = 0;
	  var lastC = 0;
	  args[0].replace(/%[a-zA-Z%]/g, function(match) {
	    if ('%%' === match) return;
	    index++;
	    if ('%c' === match) {
	      // we only are interested in the *last* %c
	      // (the user may have provided their own)
	      lastC = index;
	    }
	  });

	  args.splice(lastC, 0, c);
	}

	/**
	 * Invokes `console.log()` when available.
	 * No-op when `console.log` is not a "function".
	 *
	 * @api public
	 */

	function log() {
	  // this hackery is required for IE8/9, where
	  // the `console.log` function doesn't have 'apply'
	  return 'object' === typeof console
	    && console.log
	    && Function.prototype.apply.call(console.log, console, arguments);
	}

	/**
	 * Save `namespaces`.
	 *
	 * @param {String} namespaces
	 * @api private
	 */

	function save(namespaces) {
	  try {
	    if (null == namespaces) {
	      exports.storage.removeItem('debug');
	    } else {
	      exports.storage.debug = namespaces;
	    }
	  } catch(e) {}
	}

	/**
	 * Load `namespaces`.
	 *
	 * @return {String} returns the previously persisted debug modes
	 * @api private
	 */

	function load() {
	  var r;
	  try {
	    r = exports.storage.debug;
	  } catch(e) {}

	  // If debug isn't set in LS, and we're in Electron, try to load $DEBUG
	  if (!r && typeof process !== 'undefined' && 'env' in process) {
	    r = process.env.DEBUG;
	  }

	  return r;
	}

	/**
	 * Enable namespaces listed in `localStorage.debug` initially.
	 */

	exports.enable(load());

	/**
	 * Localstorage attempts to return the localstorage.
	 *
	 * This is necessary because safari throws
	 * when a user disables cookies/localstorage
	 * and you attempt to access it.
	 *
	 * @return {LocalStorage}
	 * @api private
	 */

	function localstorage() {
	  try {
	    return window.localStorage;
	  } catch (e) {}
	}
	});
	var browser_1 = browser.log;
	var browser_2 = browser.formatArgs;
	var browser_3 = browser.save;
	var browser_4 = browser.load;
	var browser_5 = browser.useColors;
	var browser_6 = browser.storage;
	var browser_7 = browser.colors;

	/**
	 * Module dependencies.
	 */


	var debug$1 = browser('socket.io-client:url');

	/**
	 * Module exports.
	 */

	var url_1 = url;

	/**
	 * URL parser.
	 *
	 * @param {String} url
	 * @param {Object} An object meant to mimic window.location.
	 *                 Defaults to window.location.
	 * @api public
	 */

	function url (uri, loc) {
	  var obj = uri;

	  // default to window.location
	  loc = loc || commonjsGlobal.location;
	  if (null == uri) uri = loc.protocol + '//' + loc.host;

	  // relative path support
	  if ('string' === typeof uri) {
	    if ('/' === uri.charAt(0)) {
	      if ('/' === uri.charAt(1)) {
	        uri = loc.protocol + uri;
	      } else {
	        uri = loc.host + uri;
	      }
	    }

	    if (!/^(https?|wss?):\/\//.test(uri)) {
	      debug$1('protocol-less url %s', uri);
	      if ('undefined' !== typeof loc) {
	        uri = loc.protocol + '//' + uri;
	      } else {
	        uri = 'https://' + uri;
	      }
	    }

	    // parse
	    debug$1('parse %s', uri);
	    obj = parseuri(uri);
	  }

	  // make sure we treat `localhost:80` and `localhost` equally
	  if (!obj.port) {
	    if (/^(http|ws)$/.test(obj.protocol)) {
	      obj.port = '80';
	    } else if (/^(http|ws)s$/.test(obj.protocol)) {
	      obj.port = '443';
	    }
	  }

	  obj.path = obj.path || '/';

	  var ipv6 = obj.host.indexOf(':') !== -1;
	  var host = ipv6 ? '[' + obj.host + ']' : obj.host;

	  // define unique id
	  obj.id = obj.protocol + '://' + host + ':' + obj.port;
	  // define href
	  obj.href = obj.protocol + '://' + host + (loc && loc.port === obj.port ? '' : (':' + obj.port));

	  return obj;
	}

	var componentEmitter = createCommonjsModule(function (module) {
	/**
	 * Expose `Emitter`.
	 */

	{
	  module.exports = Emitter;
	}

	/**
	 * Initialize a new `Emitter`.
	 *
	 * @api public
	 */

	function Emitter(obj) {
	  if (obj) return mixin(obj);
	}
	/**
	 * Mixin the emitter properties.
	 *
	 * @param {Object} obj
	 * @return {Object}
	 * @api private
	 */

	function mixin(obj) {
	  for (var key in Emitter.prototype) {
	    obj[key] = Emitter.prototype[key];
	  }
	  return obj;
	}

	/**
	 * Listen on the given `event` with `fn`.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.on =
	Emitter.prototype.addEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};
	  (this._callbacks['$' + event] = this._callbacks['$' + event] || [])
	    .push(fn);
	  return this;
	};

	/**
	 * Adds an `event` listener that will be invoked a single
	 * time then automatically removed.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.once = function(event, fn){
	  function on() {
	    this.off(event, on);
	    fn.apply(this, arguments);
	  }

	  on.fn = fn;
	  this.on(event, on);
	  return this;
	};

	/**
	 * Remove the given callback for `event` or all
	 * registered callbacks.
	 *
	 * @param {String} event
	 * @param {Function} fn
	 * @return {Emitter}
	 * @api public
	 */

	Emitter.prototype.off =
	Emitter.prototype.removeListener =
	Emitter.prototype.removeAllListeners =
	Emitter.prototype.removeEventListener = function(event, fn){
	  this._callbacks = this._callbacks || {};

	  // all
	  if (0 == arguments.length) {
	    this._callbacks = {};
	    return this;
	  }

	  // specific event
	  var callbacks = this._callbacks['$' + event];
	  if (!callbacks) return this;

	  // remove all handlers
	  if (1 == arguments.length) {
	    delete this._callbacks['$' + event];
	    return this;
	  }

	  // remove specific handler
	  var cb;
	  for (var i = 0; i < callbacks.length; i++) {
	    cb = callbacks[i];
	    if (cb === fn || cb.fn === fn) {
	      callbacks.splice(i, 1);
	      break;
	    }
	  }
	  return this;
	};

	/**
	 * Emit `event` with the given args.
	 *
	 * @param {String} event
	 * @param {Mixed} ...
	 * @return {Emitter}
	 */

	Emitter.prototype.emit = function(event){
	  this._callbacks = this._callbacks || {};
	  var args = [].slice.call(arguments, 1)
	    , callbacks = this._callbacks['$' + event];

	  if (callbacks) {
	    callbacks = callbacks.slice(0);
	    for (var i = 0, len = callbacks.length; i < len; ++i) {
	      callbacks[i].apply(this, args);
	    }
	  }

	  return this;
	};

	/**
	 * Return array of callbacks for `event`.
	 *
	 * @param {String} event
	 * @return {Array}
	 * @api public
	 */

	Emitter.prototype.listeners = function(event){
	  this._callbacks = this._callbacks || {};
	  return this._callbacks['$' + event] || [];
	};

	/**
	 * Check if this emitter has `event` handlers.
	 *
	 * @param {String} event
	 * @return {Boolean}
	 * @api public
	 */

	Emitter.prototype.hasListeners = function(event){
	  return !! this.listeners(event).length;
	};
	});

	var toString$2 = {}.toString;

	var isarray = Array.isArray || function (arr) {
	  return toString$2.call(arr) == '[object Array]';
	};

	var isBuffer = isBuf;

	var withNativeBuffer = typeof commonjsGlobal.Buffer === 'function' && typeof commonjsGlobal.Buffer.isBuffer === 'function';
	var withNativeArrayBuffer = typeof commonjsGlobal.ArrayBuffer === 'function';

	var isView$1 = (function () {
	  if (withNativeArrayBuffer && typeof commonjsGlobal.ArrayBuffer.isView === 'function') {
	    return commonjsGlobal.ArrayBuffer.isView;
	  } else {
	    return function (obj) { return obj.buffer instanceof commonjsGlobal.ArrayBuffer; };
	  }
	})();

	/**
	 * Returns true if obj is a buffer or an arraybuffer.
	 *
	 * @api private
	 */

	function isBuf(obj) {
	  return (withNativeBuffer && commonjsGlobal.Buffer.isBuffer(obj)) ||
	          (withNativeArrayBuffer && (obj instanceof commonjsGlobal.ArrayBuffer || isView$1(obj)));
	}

	/*global Blob,File*/

	/**
	 * Module requirements
	 */



	var toString$3 = Object.prototype.toString;
	var withNativeBlob = typeof commonjsGlobal.Blob === 'function' || toString$3.call(commonjsGlobal.Blob) === '[object BlobConstructor]';
	var withNativeFile = typeof commonjsGlobal.File === 'function' || toString$3.call(commonjsGlobal.File) === '[object FileConstructor]';

	/**
	 * Replaces every Buffer | ArrayBuffer in packet with a numbered placeholder.
	 * Anything with blobs or files should be fed through removeBlobs before coming
	 * here.
	 *
	 * @param {Object} packet - socket.io event packet
	 * @return {Object} with deconstructed packet and list of buffers
	 * @api public
	 */

	var deconstructPacket = function(packet) {
	  var buffers = [];
	  var packetData = packet.data;
	  var pack = packet;
	  pack.data = _deconstructPacket(packetData, buffers);
	  pack.attachments = buffers.length; // number of binary 'attachments'
	  return {packet: pack, buffers: buffers};
	};

	function _deconstructPacket(data, buffers) {
	  if (!data) return data;

	  if (isBuffer(data)) {
	    var placeholder = { _placeholder: true, num: buffers.length };
	    buffers.push(data);
	    return placeholder;
	  } else if (isarray(data)) {
	    var newData = new Array(data.length);
	    for (var i = 0; i < data.length; i++) {
	      newData[i] = _deconstructPacket(data[i], buffers);
	    }
	    return newData;
	  } else if (typeof data === 'object' && !(data instanceof Date)) {
	    var newData = {};
	    for (var key in data) {
	      newData[key] = _deconstructPacket(data[key], buffers);
	    }
	    return newData;
	  }
	  return data;
	}

	/**
	 * Reconstructs a binary packet from its placeholder packet and buffers
	 *
	 * @param {Object} packet - event packet with placeholders
	 * @param {Array} buffers - binary buffers to put in placeholder positions
	 * @return {Object} reconstructed packet
	 * @api public
	 */

	var reconstructPacket = function(packet, buffers) {
	  packet.data = _reconstructPacket(packet.data, buffers);
	  packet.attachments = undefined; // no longer useful
	  return packet;
	};

	function _reconstructPacket(data, buffers) {
	  if (!data) return data;

	  if (data && data._placeholder) {
	    return buffers[data.num]; // appropriate buffer (should be natural order anyway)
	  } else if (isarray(data)) {
	    for (var i = 0; i < data.length; i++) {
	      data[i] = _reconstructPacket(data[i], buffers);
	    }
	  } else if (typeof data === 'object') {
	    for (var key in data) {
	      data[key] = _reconstructPacket(data[key], buffers);
	    }
	  }

	  return data;
	}

	/**
	 * Asynchronously removes Blobs or Files from data via
	 * FileReader's readAsArrayBuffer method. Used before encoding
	 * data as msgpack. Calls callback with the blobless data.
	 *
	 * @param {Object} data
	 * @param {Function} callback
	 * @api private
	 */

	var removeBlobs = function(data, callback) {
	  function _removeBlobs(obj, curKey, containingObject) {
	    if (!obj) return obj;

	    // convert any blob
	    if ((withNativeBlob && obj instanceof Blob) ||
	        (withNativeFile && obj instanceof File)) {
	      pendingBlobs++;

	      // async filereader
	      var fileReader = new FileReader();
	      fileReader.onload = function() { // this.result == arraybuffer
	        if (containingObject) {
	          containingObject[curKey] = this.result;
	        }
	        else {
	          bloblessData = this.result;
	        }

	        // if nothing pending its callback time
	        if(! --pendingBlobs) {
	          callback(bloblessData);
	        }
	      };

	      fileReader.readAsArrayBuffer(obj); // blob -> arraybuffer
	    } else if (isarray(obj)) { // handle array
	      for (var i = 0; i < obj.length; i++) {
	        _removeBlobs(obj[i], i, obj);
	      }
	    } else if (typeof obj === 'object' && !isBuffer(obj)) { // and object
	      for (var key in obj) {
	        _removeBlobs(obj[key], key, obj);
	      }
	    }
	  }

	  var pendingBlobs = 0;
	  var bloblessData = data;
	  _removeBlobs(bloblessData);
	  if (!pendingBlobs) {
	    callback(bloblessData);
	  }
	};

	var binary = {
		deconstructPacket: deconstructPacket,
		reconstructPacket: reconstructPacket,
		removeBlobs: removeBlobs
	};

	var socket_ioParser = createCommonjsModule(function (module, exports) {
	/**
	 * Module dependencies.
	 */

	var debug = browser('socket.io-parser');





	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	exports.protocol = 4;

	/**
	 * Packet types.
	 *
	 * @api public
	 */

	exports.types = [
	  'CONNECT',
	  'DISCONNECT',
	  'EVENT',
	  'ACK',
	  'ERROR',
	  'BINARY_EVENT',
	  'BINARY_ACK'
	];

	/**
	 * Packet type `connect`.
	 *
	 * @api public
	 */

	exports.CONNECT = 0;

	/**
	 * Packet type `disconnect`.
	 *
	 * @api public
	 */

	exports.DISCONNECT = 1;

	/**
	 * Packet type `event`.
	 *
	 * @api public
	 */

	exports.EVENT = 2;

	/**
	 * Packet type `ack`.
	 *
	 * @api public
	 */

	exports.ACK = 3;

	/**
	 * Packet type `error`.
	 *
	 * @api public
	 */

	exports.ERROR = 4;

	/**
	 * Packet type 'binary event'
	 *
	 * @api public
	 */

	exports.BINARY_EVENT = 5;

	/**
	 * Packet type `binary ack`. For acks with binary arguments.
	 *
	 * @api public
	 */

	exports.BINARY_ACK = 6;

	/**
	 * Encoder constructor.
	 *
	 * @api public
	 */

	exports.Encoder = Encoder;

	/**
	 * Decoder constructor.
	 *
	 * @api public
	 */

	exports.Decoder = Decoder;

	/**
	 * A socket.io Encoder instance
	 *
	 * @api public
	 */

	function Encoder() {}

	var ERROR_PACKET = exports.ERROR + '"encode error"';

	/**
	 * Encode a packet as a single string if non-binary, or as a
	 * buffer sequence, depending on packet type.
	 *
	 * @param {Object} obj - packet object
	 * @param {Function} callback - function to handle encodings (likely engine.write)
	 * @return Calls callback with Array of encodings
	 * @api public
	 */

	Encoder.prototype.encode = function(obj, callback){
	  debug('encoding packet %j', obj);

	  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
	    encodeAsBinary(obj, callback);
	  } else {
	    var encoding = encodeAsString(obj);
	    callback([encoding]);
	  }
	};

	/**
	 * Encode packet as string.
	 *
	 * @param {Object} packet
	 * @return {String} encoded
	 * @api private
	 */

	function encodeAsString(obj) {

	  // first is type
	  var str = '' + obj.type;

	  // attachments if we have them
	  if (exports.BINARY_EVENT === obj.type || exports.BINARY_ACK === obj.type) {
	    str += obj.attachments + '-';
	  }

	  // if we have a namespace other than `/`
	  // we append it followed by a comma `,`
	  if (obj.nsp && '/' !== obj.nsp) {
	    str += obj.nsp + ',';
	  }

	  // immediately followed by the id
	  if (null != obj.id) {
	    str += obj.id;
	  }

	  // json data
	  if (null != obj.data) {
	    var payload = tryStringify(obj.data);
	    if (payload !== false) {
	      str += payload;
	    } else {
	      return ERROR_PACKET;
	    }
	  }

	  debug('encoded %j as %s', obj, str);
	  return str;
	}

	function tryStringify(str) {
	  try {
	    return JSON.stringify(str);
	  } catch(e){
	    return false;
	  }
	}

	/**
	 * Encode packet as 'buffer sequence' by removing blobs, and
	 * deconstructing packet into object with placeholders and
	 * a list of buffers.
	 *
	 * @param {Object} packet
	 * @return {Buffer} encoded
	 * @api private
	 */

	function encodeAsBinary(obj, callback) {

	  function writeEncoding(bloblessData) {
	    var deconstruction = binary.deconstructPacket(bloblessData);
	    var pack = encodeAsString(deconstruction.packet);
	    var buffers = deconstruction.buffers;

	    buffers.unshift(pack); // add packet info to beginning of data list
	    callback(buffers); // write all the buffers
	  }

	  binary.removeBlobs(obj, writeEncoding);
	}

	/**
	 * A socket.io Decoder instance
	 *
	 * @return {Object} decoder
	 * @api public
	 */

	function Decoder() {
	  this.reconstructor = null;
	}

	/**
	 * Mix in `Emitter` with Decoder.
	 */

	componentEmitter(Decoder.prototype);

	/**
	 * Decodes an ecoded packet string into packet JSON.
	 *
	 * @param {String} obj - encoded packet
	 * @return {Object} packet
	 * @api public
	 */

	Decoder.prototype.add = function(obj) {
	  var packet;
	  if (typeof obj === 'string') {
	    packet = decodeString(obj);
	    if (exports.BINARY_EVENT === packet.type || exports.BINARY_ACK === packet.type) { // binary packet's json
	      this.reconstructor = new BinaryReconstructor(packet);

	      // no attachments, labeled binary but no binary data to follow
	      if (this.reconstructor.reconPack.attachments === 0) {
	        this.emit('decoded', packet);
	      }
	    } else { // non-binary full packet
	      this.emit('decoded', packet);
	    }
	  }
	  else if (isBuffer(obj) || obj.base64) { // raw binary data
	    if (!this.reconstructor) {
	      throw new Error('got binary data when not reconstructing a packet');
	    } else {
	      packet = this.reconstructor.takeBinaryData(obj);
	      if (packet) { // received final buffer
	        this.reconstructor = null;
	        this.emit('decoded', packet);
	      }
	    }
	  }
	  else {
	    throw new Error('Unknown type: ' + obj);
	  }
	};

	/**
	 * Decode a packet String (JSON data)
	 *
	 * @param {String} str
	 * @return {Object} packet
	 * @api private
	 */

	function decodeString(str) {
	  var i = 0;
	  // look up type
	  var p = {
	    type: Number(str.charAt(0))
	  };

	  if (null == exports.types[p.type]) {
	    return error('unknown packet type ' + p.type);
	  }

	  // look up attachments if type binary
	  if (exports.BINARY_EVENT === p.type || exports.BINARY_ACK === p.type) {
	    var buf = '';
	    while (str.charAt(++i) !== '-') {
	      buf += str.charAt(i);
	      if (i == str.length) break;
	    }
	    if (buf != Number(buf) || str.charAt(i) !== '-') {
	      throw new Error('Illegal attachments');
	    }
	    p.attachments = Number(buf);
	  }

	  // look up namespace (if any)
	  if ('/' === str.charAt(i + 1)) {
	    p.nsp = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (',' === c) break;
	      p.nsp += c;
	      if (i === str.length) break;
	    }
	  } else {
	    p.nsp = '/';
	  }

	  // look up id
	  var next = str.charAt(i + 1);
	  if ('' !== next && Number(next) == next) {
	    p.id = '';
	    while (++i) {
	      var c = str.charAt(i);
	      if (null == c || Number(c) != c) {
	        --i;
	        break;
	      }
	      p.id += str.charAt(i);
	      if (i === str.length) break;
	    }
	    p.id = Number(p.id);
	  }

	  // look up json data
	  if (str.charAt(++i)) {
	    var payload = tryParse(str.substr(i));
	    var isPayloadValid = payload !== false && (p.type === exports.ERROR || isarray(payload));
	    if (isPayloadValid) {
	      p.data = payload;
	    } else {
	      return error('invalid payload');
	    }
	  }

	  debug('decoded %s as %j', str, p);
	  return p;
	}

	function tryParse(str) {
	  try {
	    return JSON.parse(str);
	  } catch(e){
	    return false;
	  }
	}

	/**
	 * Deallocates a parser's resources
	 *
	 * @api public
	 */

	Decoder.prototype.destroy = function() {
	  if (this.reconstructor) {
	    this.reconstructor.finishedReconstruction();
	  }
	};

	/**
	 * A manager of a binary event's 'buffer sequence'. Should
	 * be constructed whenever a packet of type BINARY_EVENT is
	 * decoded.
	 *
	 * @param {Object} packet
	 * @return {BinaryReconstructor} initialized reconstructor
	 * @api private
	 */

	function BinaryReconstructor(packet) {
	  this.reconPack = packet;
	  this.buffers = [];
	}

	/**
	 * Method to be called when binary data received from connection
	 * after a BINARY_EVENT packet.
	 *
	 * @param {Buffer | ArrayBuffer} binData - the raw binary data received
	 * @return {null | Object} returns null if more binary data is expected or
	 *   a reconstructed packet object if all buffers have been received.
	 * @api private
	 */

	BinaryReconstructor.prototype.takeBinaryData = function(binData) {
	  this.buffers.push(binData);
	  if (this.buffers.length === this.reconPack.attachments) { // done with buffer list
	    var packet = binary.reconstructPacket(this.reconPack, this.buffers);
	    this.finishedReconstruction();
	    return packet;
	  }
	  return null;
	};

	/**
	 * Cleans up binary packet reconstruction variables.
	 *
	 * @api private
	 */

	BinaryReconstructor.prototype.finishedReconstruction = function() {
	  this.reconPack = null;
	  this.buffers = [];
	};

	function error(msg) {
	  return {
	    type: exports.ERROR,
	    data: 'parser error: ' + msg
	  };
	}
	});
	var socket_ioParser_1 = socket_ioParser.protocol;
	var socket_ioParser_2 = socket_ioParser.types;
	var socket_ioParser_3 = socket_ioParser.CONNECT;
	var socket_ioParser_4 = socket_ioParser.DISCONNECT;
	var socket_ioParser_5 = socket_ioParser.EVENT;
	var socket_ioParser_6 = socket_ioParser.ACK;
	var socket_ioParser_7 = socket_ioParser.ERROR;
	var socket_ioParser_8 = socket_ioParser.BINARY_EVENT;
	var socket_ioParser_9 = socket_ioParser.BINARY_ACK;
	var socket_ioParser_10 = socket_ioParser.Encoder;
	var socket_ioParser_11 = socket_ioParser.Decoder;

	var hasCors = createCommonjsModule(function (module) {
	/**
	 * Module exports.
	 *
	 * Logic borrowed from Modernizr:
	 *
	 *   - https://github.com/Modernizr/Modernizr/blob/master/feature-detects/cors.js
	 */

	try {
	  module.exports = typeof XMLHttpRequest !== 'undefined' &&
	    'withCredentials' in new XMLHttpRequest();
	} catch (err) {
	  // if XMLHttp support is disabled in IE then it will throw
	  // when trying to create
	  module.exports = false;
	}
	});

	// browser shim for xmlhttprequest module



	var xmlhttprequest = function (opts) {
	  var xdomain = opts.xdomain;

	  // scheme must be same when usign XDomainRequest
	  // http://blogs.msdn.com/b/ieinternals/archive/2010/05/13/xdomainrequest-restrictions-limitations-and-workarounds.aspx
	  var xscheme = opts.xscheme;

	  // XDomainRequest has a flow of not sending cookie, therefore it should be disabled as a default.
	  // https://github.com/Automattic/engine.io-client/pull/217
	  var enablesXDR = opts.enablesXDR;

	  // XMLHttpRequest can be disabled on IE
	  try {
	    if ('undefined' !== typeof XMLHttpRequest && (!xdomain || hasCors)) {
	      return new XMLHttpRequest();
	    }
	  } catch (e) { }

	  // Use XDomainRequest for IE8 if enablesXDR is true
	  // because loading bar keeps flashing when using jsonp-polling
	  // https://github.com/yujiosaka/socke.io-ie8-loading-example
	  try {
	    if ('undefined' !== typeof XDomainRequest && !xscheme && enablesXDR) {
	      return new XDomainRequest();
	    }
	  } catch (e) { }

	  if (!xdomain) {
	    try {
	      return new commonjsGlobal[['Active'].concat('Object').join('X')]('Microsoft.XMLHTTP');
	    } catch (e) { }
	  }
	};

	/**
	 * Gets the keys for an object.
	 *
	 * @return {Array} keys
	 * @api private
	 */

	var keys$3 = Object.keys || function keys (obj){
	  var arr = [];
	  var has = Object.prototype.hasOwnProperty;

	  for (var i in obj) {
	    if (has.call(obj, i)) {
	      arr.push(i);
	    }
	  }
	  return arr;
	};

	/* global Blob File */

	/*
	 * Module requirements.
	 */



	var toString$4 = Object.prototype.toString;
	var withNativeBlob$1 = typeof Blob === 'function' ||
	                        typeof Blob !== 'undefined' && toString$4.call(Blob) === '[object BlobConstructor]';
	var withNativeFile$1 = typeof File === 'function' ||
	                        typeof File !== 'undefined' && toString$4.call(File) === '[object FileConstructor]';

	/**
	 * Module exports.
	 */

	var hasBinary2 = hasBinary;

	/**
	 * Checks for binary data.
	 *
	 * Supports Buffer, ArrayBuffer, Blob and File.
	 *
	 * @param {Object} anything
	 * @api public
	 */

	function hasBinary (obj) {
	  if (!obj || typeof obj !== 'object') {
	    return false;
	  }

	  if (isarray(obj)) {
	    for (var i = 0, l = obj.length; i < l; i++) {
	      if (hasBinary(obj[i])) {
	        return true;
	      }
	    }
	    return false;
	  }

	  if ((typeof Buffer === 'function' && Buffer.isBuffer && Buffer.isBuffer(obj)) ||
	    (typeof ArrayBuffer === 'function' && obj instanceof ArrayBuffer) ||
	    (withNativeBlob$1 && obj instanceof Blob) ||
	    (withNativeFile$1 && obj instanceof File)
	  ) {
	    return true;
	  }

	  // see: https://github.com/Automattic/has-binary/pull/4
	  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
	    return hasBinary(obj.toJSON(), true);
	  }

	  for (var key in obj) {
	    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
	      return true;
	    }
	  }

	  return false;
	}

	/**
	 * An abstraction for slicing an arraybuffer even when
	 * ArrayBuffer.prototype.slice is not supported
	 *
	 * @api public
	 */

	var arraybuffer_slice = function(arraybuffer, start, end) {
	  var bytes = arraybuffer.byteLength;
	  start = start || 0;
	  end = end || bytes;

	  if (arraybuffer.slice) { return arraybuffer.slice(start, end); }

	  if (start < 0) { start += bytes; }
	  if (end < 0) { end += bytes; }
	  if (end > bytes) { end = bytes; }

	  if (start >= bytes || start >= end || bytes === 0) {
	    return new ArrayBuffer(0);
	  }

	  var abv = new Uint8Array(arraybuffer);
	  var result = new Uint8Array(end - start);
	  for (var i = start, ii = 0; i < end; i++, ii++) {
	    result[ii] = abv[i];
	  }
	  return result.buffer;
	};

	var after_1 = after;

	function after(count, callback, err_cb) {
	    var bail = false;
	    err_cb = err_cb || noop;
	    proxy.count = count;

	    return (count === 0) ? callback() : proxy

	    function proxy(err, result) {
	        if (proxy.count <= 0) {
	            throw new Error('after called too many times')
	        }
	        --proxy.count;

	        // after first error, rest are passed to err_cb
	        if (err) {
	            bail = true;
	            callback(err);
	            // future error callbacks will go to error handler
	            callback = err_cb;
	        } else if (proxy.count === 0 && !bail) {
	            callback(null, result);
	        }
	    }
	}

	function noop() {}

	var utf8 = createCommonjsModule(function (module, exports) {
	(function(root) {

		// Detect free variables `exports`
		var freeExports =  exports;

		// Detect free variable `module`
		var freeModule =  module &&
			module.exports == freeExports && module;

		// Detect free variable `global`, from Node.js or Browserified code,
		// and use it as `root`
		var freeGlobal = typeof commonjsGlobal == 'object' && commonjsGlobal;
		if (freeGlobal.global === freeGlobal || freeGlobal.window === freeGlobal) {
			root = freeGlobal;
		}

		/*--------------------------------------------------------------------------*/

		var stringFromCharCode = String.fromCharCode;

		// Taken from https://mths.be/punycode
		function ucs2decode(string) {
			var output = [];
			var counter = 0;
			var length = string.length;
			var value;
			var extra;
			while (counter < length) {
				value = string.charCodeAt(counter++);
				if (value >= 0xD800 && value <= 0xDBFF && counter < length) {
					// high surrogate, and there is a next character
					extra = string.charCodeAt(counter++);
					if ((extra & 0xFC00) == 0xDC00) { // low surrogate
						output.push(((value & 0x3FF) << 10) + (extra & 0x3FF) + 0x10000);
					} else {
						// unmatched surrogate; only append this code unit, in case the next
						// code unit is the high surrogate of a surrogate pair
						output.push(value);
						counter--;
					}
				} else {
					output.push(value);
				}
			}
			return output;
		}

		// Taken from https://mths.be/punycode
		function ucs2encode(array) {
			var length = array.length;
			var index = -1;
			var value;
			var output = '';
			while (++index < length) {
				value = array[index];
				if (value > 0xFFFF) {
					value -= 0x10000;
					output += stringFromCharCode(value >>> 10 & 0x3FF | 0xD800);
					value = 0xDC00 | value & 0x3FF;
				}
				output += stringFromCharCode(value);
			}
			return output;
		}

		function checkScalarValue(codePoint, strict) {
			if (codePoint >= 0xD800 && codePoint <= 0xDFFF) {
				if (strict) {
					throw Error(
						'Lone surrogate U+' + codePoint.toString(16).toUpperCase() +
						' is not a scalar value'
					);
				}
				return false;
			}
			return true;
		}
		/*--------------------------------------------------------------------------*/

		function createByte(codePoint, shift) {
			return stringFromCharCode(((codePoint >> shift) & 0x3F) | 0x80);
		}

		function encodeCodePoint(codePoint, strict) {
			if ((codePoint & 0xFFFFFF80) == 0) { // 1-byte sequence
				return stringFromCharCode(codePoint);
			}
			var symbol = '';
			if ((codePoint & 0xFFFFF800) == 0) { // 2-byte sequence
				symbol = stringFromCharCode(((codePoint >> 6) & 0x1F) | 0xC0);
			}
			else if ((codePoint & 0xFFFF0000) == 0) { // 3-byte sequence
				if (!checkScalarValue(codePoint, strict)) {
					codePoint = 0xFFFD;
				}
				symbol = stringFromCharCode(((codePoint >> 12) & 0x0F) | 0xE0);
				symbol += createByte(codePoint, 6);
			}
			else if ((codePoint & 0xFFE00000) == 0) { // 4-byte sequence
				symbol = stringFromCharCode(((codePoint >> 18) & 0x07) | 0xF0);
				symbol += createByte(codePoint, 12);
				symbol += createByte(codePoint, 6);
			}
			symbol += stringFromCharCode((codePoint & 0x3F) | 0x80);
			return symbol;
		}

		function utf8encode(string, opts) {
			opts = opts || {};
			var strict = false !== opts.strict;

			var codePoints = ucs2decode(string);
			var length = codePoints.length;
			var index = -1;
			var codePoint;
			var byteString = '';
			while (++index < length) {
				codePoint = codePoints[index];
				byteString += encodeCodePoint(codePoint, strict);
			}
			return byteString;
		}

		/*--------------------------------------------------------------------------*/

		function readContinuationByte() {
			if (byteIndex >= byteCount) {
				throw Error('Invalid byte index');
			}

			var continuationByte = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			if ((continuationByte & 0xC0) == 0x80) {
				return continuationByte & 0x3F;
			}

			// If we end up here, itâ€™s not a continuation byte
			throw Error('Invalid continuation byte');
		}

		function decodeSymbol(strict) {
			var byte1;
			var byte2;
			var byte3;
			var byte4;
			var codePoint;

			if (byteIndex > byteCount) {
				throw Error('Invalid byte index');
			}

			if (byteIndex == byteCount) {
				return false;
			}

			// Read first byte
			byte1 = byteArray[byteIndex] & 0xFF;
			byteIndex++;

			// 1-byte sequence (no continuation bytes)
			if ((byte1 & 0x80) == 0) {
				return byte1;
			}

			// 2-byte sequence
			if ((byte1 & 0xE0) == 0xC0) {
				byte2 = readContinuationByte();
				codePoint = ((byte1 & 0x1F) << 6) | byte2;
				if (codePoint >= 0x80) {
					return codePoint;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 3-byte sequence (may include unpaired surrogates)
			if ((byte1 & 0xF0) == 0xE0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				codePoint = ((byte1 & 0x0F) << 12) | (byte2 << 6) | byte3;
				if (codePoint >= 0x0800) {
					return checkScalarValue(codePoint, strict) ? codePoint : 0xFFFD;
				} else {
					throw Error('Invalid continuation byte');
				}
			}

			// 4-byte sequence
			if ((byte1 & 0xF8) == 0xF0) {
				byte2 = readContinuationByte();
				byte3 = readContinuationByte();
				byte4 = readContinuationByte();
				codePoint = ((byte1 & 0x07) << 0x12) | (byte2 << 0x0C) |
					(byte3 << 0x06) | byte4;
				if (codePoint >= 0x010000 && codePoint <= 0x10FFFF) {
					return codePoint;
				}
			}

			throw Error('Invalid UTF-8 detected');
		}

		var byteArray;
		var byteCount;
		var byteIndex;
		function utf8decode(byteString, opts) {
			opts = opts || {};
			var strict = false !== opts.strict;

			byteArray = ucs2decode(byteString);
			byteCount = byteArray.length;
			byteIndex = 0;
			var codePoints = [];
			var tmp;
			while ((tmp = decodeSymbol(strict)) !== false) {
				codePoints.push(tmp);
			}
			return ucs2encode(codePoints);
		}

		/*--------------------------------------------------------------------------*/

		var utf8 = {
			'version': '2.1.2',
			'encode': utf8encode,
			'decode': utf8decode
		};

		// Some AMD build optimizers, like r.js, check for specific condition patterns
		// like the following:
		if (freeExports && !freeExports.nodeType) {
			if (freeModule) { // in Node.js or RingoJS v0.8.0+
				freeModule.exports = utf8;
			} else { // in Narwhal or RingoJS v0.7.0-
				var object = {};
				var hasOwnProperty = object.hasOwnProperty;
				for (var key in utf8) {
					hasOwnProperty.call(utf8, key) && (freeExports[key] = utf8[key]);
				}
			}
		} else { // in Rhino or a web browser
			root.utf8 = utf8;
		}

	}(commonjsGlobal));
	});

	var base64Arraybuffer = createCommonjsModule(function (module, exports) {
	/*
	 * base64-arraybuffer
	 * https://github.com/niklasvh/base64-arraybuffer
	 *
	 * Copyright (c) 2012 Niklas von Hertzen
	 * Licensed under the MIT license.
	 */
	(function(){

	  var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";

	  // Use a lookup table to find the index.
	  var lookup = new Uint8Array(256);
	  for (var i = 0; i < chars.length; i++) {
	    lookup[chars.charCodeAt(i)] = i;
	  }

	  exports.encode = function(arraybuffer) {
	    var bytes = new Uint8Array(arraybuffer),
	    i, len = bytes.length, base64 = "";

	    for (i = 0; i < len; i+=3) {
	      base64 += chars[bytes[i] >> 2];
	      base64 += chars[((bytes[i] & 3) << 4) | (bytes[i + 1] >> 4)];
	      base64 += chars[((bytes[i + 1] & 15) << 2) | (bytes[i + 2] >> 6)];
	      base64 += chars[bytes[i + 2] & 63];
	    }

	    if ((len % 3) === 2) {
	      base64 = base64.substring(0, base64.length - 1) + "=";
	    } else if (len % 3 === 1) {
	      base64 = base64.substring(0, base64.length - 2) + "==";
	    }

	    return base64;
	  };

	  exports.decode =  function(base64) {
	    var bufferLength = base64.length * 0.75,
	    len = base64.length, i, p = 0,
	    encoded1, encoded2, encoded3, encoded4;

	    if (base64[base64.length - 1] === "=") {
	      bufferLength--;
	      if (base64[base64.length - 2] === "=") {
	        bufferLength--;
	      }
	    }

	    var arraybuffer = new ArrayBuffer(bufferLength),
	    bytes = new Uint8Array(arraybuffer);

	    for (i = 0; i < len; i+=4) {
	      encoded1 = lookup[base64.charCodeAt(i)];
	      encoded2 = lookup[base64.charCodeAt(i+1)];
	      encoded3 = lookup[base64.charCodeAt(i+2)];
	      encoded4 = lookup[base64.charCodeAt(i+3)];

	      bytes[p++] = (encoded1 << 2) | (encoded2 >> 4);
	      bytes[p++] = ((encoded2 & 15) << 4) | (encoded3 >> 2);
	      bytes[p++] = ((encoded3 & 3) << 6) | (encoded4 & 63);
	    }

	    return arraybuffer;
	  };
	})();
	});
	var base64Arraybuffer_1 = base64Arraybuffer.encode;
	var base64Arraybuffer_2 = base64Arraybuffer.decode;

	/**
	 * Create a blob builder even when vendor prefixes exist
	 */

	var BlobBuilder = commonjsGlobal.BlobBuilder
	  || commonjsGlobal.WebKitBlobBuilder
	  || commonjsGlobal.MSBlobBuilder
	  || commonjsGlobal.MozBlobBuilder;

	/**
	 * Check if Blob constructor is supported
	 */

	var blobSupported = (function() {
	  try {
	    var a = new Blob(['hi']);
	    return a.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();

	/**
	 * Check if Blob constructor supports ArrayBufferViews
	 * Fails in Safari 6, so we need to map to ArrayBuffers there.
	 */

	var blobSupportsArrayBufferView = blobSupported && (function() {
	  try {
	    var b = new Blob([new Uint8Array([1,2])]);
	    return b.size === 2;
	  } catch(e) {
	    return false;
	  }
	})();

	/**
	 * Check if BlobBuilder is supported
	 */

	var blobBuilderSupported = BlobBuilder
	  && BlobBuilder.prototype.append
	  && BlobBuilder.prototype.getBlob;

	/**
	 * Helper function that maps ArrayBufferViews to ArrayBuffers
	 * Used by BlobBuilder constructor and old browsers that didn't
	 * support it in the Blob constructor.
	 */

	function mapArrayBufferViews(ary) {
	  for (var i = 0; i < ary.length; i++) {
	    var chunk = ary[i];
	    if (chunk.buffer instanceof ArrayBuffer) {
	      var buf = chunk.buffer;

	      // if this is a subarray, make a copy so we only
	      // include the subarray region from the underlying buffer
	      if (chunk.byteLength !== buf.byteLength) {
	        var copy = new Uint8Array(chunk.byteLength);
	        copy.set(new Uint8Array(buf, chunk.byteOffset, chunk.byteLength));
	        buf = copy.buffer;
	      }

	      ary[i] = buf;
	    }
	  }
	}

	function BlobBuilderConstructor(ary, options) {
	  options = options || {};

	  var bb = new BlobBuilder();
	  mapArrayBufferViews(ary);

	  for (var i = 0; i < ary.length; i++) {
	    bb.append(ary[i]);
	  }

	  return (options.type) ? bb.getBlob(options.type) : bb.getBlob();
	}
	function BlobConstructor(ary, options) {
	  mapArrayBufferViews(ary);
	  return new Blob(ary, options || {});
	}
	var blob = (function() {
	  if (blobSupported) {
	    return blobSupportsArrayBufferView ? commonjsGlobal.Blob : BlobConstructor;
	  } else if (blobBuilderSupported) {
	    return BlobBuilderConstructor;
	  } else {
	    return undefined;
	  }
	})();

	var browser$1 = createCommonjsModule(function (module, exports) {
	/**
	 * Module dependencies.
	 */







	var base64encoder;
	if (commonjsGlobal && commonjsGlobal.ArrayBuffer) {
	  base64encoder = base64Arraybuffer;
	}

	/**
	 * Check if we are running an android browser. That requires us to use
	 * ArrayBuffer with polling transports...
	 *
	 * http://ghinda.net/jpeg-blob-ajax-android/
	 */

	var isAndroid = typeof navigator !== 'undefined' && /Android/i.test(navigator.userAgent);

	/**
	 * Check if we are running in PhantomJS.
	 * Uploading a Blob with PhantomJS does not work correctly, as reported here:
	 * https://github.com/ariya/phantomjs/issues/11395
	 * @type boolean
	 */
	var isPhantomJS = typeof navigator !== 'undefined' && /PhantomJS/i.test(navigator.userAgent);

	/**
	 * When true, avoids using Blobs to encode payloads.
	 * @type boolean
	 */
	var dontSendBlobs = isAndroid || isPhantomJS;

	/**
	 * Current protocol version.
	 */

	exports.protocol = 3;

	/**
	 * Packet types.
	 */

	var packets = exports.packets = {
	    open:     0    // non-ws
	  , close:    1    // non-ws
	  , ping:     2
	  , pong:     3
	  , message:  4
	  , upgrade:  5
	  , noop:     6
	};

	var packetslist = keys$3(packets);

	/**
	 * Premade error packet.
	 */

	var err = { type: 'error', data: 'parser error' };

	/**
	 * Create a blob api even for blob builder when vendor prefixes exist
	 */



	/**
	 * Encodes a packet.
	 *
	 *     <packet type id> [ <data> ]
	 *
	 * Example:
	 *
	 *     5hello world
	 *     3
	 *     4
	 *
	 * Binary is encoded in an identical principle
	 *
	 * @api private
	 */

	exports.encodePacket = function (packet, supportsBinary, utf8encode, callback) {
	  if (typeof supportsBinary === 'function') {
	    callback = supportsBinary;
	    supportsBinary = false;
	  }

	  if (typeof utf8encode === 'function') {
	    callback = utf8encode;
	    utf8encode = null;
	  }

	  var data = (packet.data === undefined)
	    ? undefined
	    : packet.data.buffer || packet.data;

	  if (commonjsGlobal.ArrayBuffer && data instanceof ArrayBuffer) {
	    return encodeArrayBuffer(packet, supportsBinary, callback);
	  } else if (blob && data instanceof commonjsGlobal.Blob) {
	    return encodeBlob(packet, supportsBinary, callback);
	  }

	  // might be an object with { base64: true, data: dataAsBase64String }
	  if (data && data.base64) {
	    return encodeBase64Object(packet, callback);
	  }

	  // Sending data as a utf-8 string
	  var encoded = packets[packet.type];

	  // data fragment is optional
	  if (undefined !== packet.data) {
	    encoded += utf8encode ? utf8.encode(String(packet.data), { strict: false }) : String(packet.data);
	  }

	  return callback('' + encoded);

	};

	function encodeBase64Object(packet, callback) {
	  // packet data is an object { base64: true, data: dataAsBase64String }
	  var message = 'b' + exports.packets[packet.type] + packet.data.data;
	  return callback(message);
	}

	/**
	 * Encode packet helpers for binary types
	 */

	function encodeArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  var data = packet.data;
	  var contentArray = new Uint8Array(data);
	  var resultBuffer = new Uint8Array(1 + data.byteLength);

	  resultBuffer[0] = packets[packet.type];
	  for (var i = 0; i < contentArray.length; i++) {
	    resultBuffer[i+1] = contentArray[i];
	  }

	  return callback(resultBuffer.buffer);
	}

	function encodeBlobAsArrayBuffer(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  var fr = new FileReader();
	  fr.onload = function() {
	    packet.data = fr.result;
	    exports.encodePacket(packet, supportsBinary, true, callback);
	  };
	  return fr.readAsArrayBuffer(packet.data);
	}

	function encodeBlob(packet, supportsBinary, callback) {
	  if (!supportsBinary) {
	    return exports.encodeBase64Packet(packet, callback);
	  }

	  if (dontSendBlobs) {
	    return encodeBlobAsArrayBuffer(packet, supportsBinary, callback);
	  }

	  var length = new Uint8Array(1);
	  length[0] = packets[packet.type];
	  var blob$1 = new blob([length.buffer, packet.data]);

	  return callback(blob$1);
	}

	/**
	 * Encodes a packet with binary data in a base64 string
	 *
	 * @param {Object} packet, has `type` and `data`
	 * @return {String} base64 encoded message
	 */

	exports.encodeBase64Packet = function(packet, callback) {
	  var message = 'b' + exports.packets[packet.type];
	  if (blob && packet.data instanceof commonjsGlobal.Blob) {
	    var fr = new FileReader();
	    fr.onload = function() {
	      var b64 = fr.result.split(',')[1];
	      callback(message + b64);
	    };
	    return fr.readAsDataURL(packet.data);
	  }

	  var b64data;
	  try {
	    b64data = String.fromCharCode.apply(null, new Uint8Array(packet.data));
	  } catch (e) {
	    // iPhone Safari doesn't let you apply with typed arrays
	    var typed = new Uint8Array(packet.data);
	    var basic = new Array(typed.length);
	    for (var i = 0; i < typed.length; i++) {
	      basic[i] = typed[i];
	    }
	    b64data = String.fromCharCode.apply(null, basic);
	  }
	  message += commonjsGlobal.btoa(b64data);
	  return callback(message);
	};

	/**
	 * Decodes a packet. Changes format to Blob if requested.
	 *
	 * @return {Object} with `type` and `data` (if any)
	 * @api private
	 */

	exports.decodePacket = function (data, binaryType, utf8decode) {
	  if (data === undefined) {
	    return err;
	  }
	  // String data
	  if (typeof data === 'string') {
	    if (data.charAt(0) === 'b') {
	      return exports.decodeBase64Packet(data.substr(1), binaryType);
	    }

	    if (utf8decode) {
	      data = tryDecode(data);
	      if (data === false) {
	        return err;
	      }
	    }
	    var type = data.charAt(0);

	    if (Number(type) != type || !packetslist[type]) {
	      return err;
	    }

	    if (data.length > 1) {
	      return { type: packetslist[type], data: data.substring(1) };
	    } else {
	      return { type: packetslist[type] };
	    }
	  }

	  var asArray = new Uint8Array(data);
	  var type = asArray[0];
	  var rest = arraybuffer_slice(data, 1);
	  if (blob && binaryType === 'blob') {
	    rest = new blob([rest]);
	  }
	  return { type: packetslist[type], data: rest };
	};

	function tryDecode(data) {
	  try {
	    data = utf8.decode(data, { strict: false });
	  } catch (e) {
	    return false;
	  }
	  return data;
	}

	/**
	 * Decodes a packet encoded in a base64 string
	 *
	 * @param {String} base64 encoded message
	 * @return {Object} with `type` and `data` (if any)
	 */

	exports.decodeBase64Packet = function(msg, binaryType) {
	  var type = packetslist[msg.charAt(0)];
	  if (!base64encoder) {
	    return { type: type, data: { base64: true, data: msg.substr(1) } };
	  }

	  var data = base64encoder.decode(msg.substr(1));

	  if (binaryType === 'blob' && blob) {
	    data = new blob([data]);
	  }

	  return { type: type, data: data };
	};

	/**
	 * Encodes multiple messages (payload).
	 *
	 *     <length>:data
	 *
	 * Example:
	 *
	 *     11:hello world2:hi
	 *
	 * If any contents are binary, they will be encoded as base64 strings. Base64
	 * encoded strings are marked with a b before the length specifier
	 *
	 * @param {Array} packets
	 * @api private
	 */

	exports.encodePayload = function (packets, supportsBinary, callback) {
	  if (typeof supportsBinary === 'function') {
	    callback = supportsBinary;
	    supportsBinary = null;
	  }

	  var isBinary = hasBinary2(packets);

	  if (supportsBinary && isBinary) {
	    if (blob && !dontSendBlobs) {
	      return exports.encodePayloadAsBlob(packets, callback);
	    }

	    return exports.encodePayloadAsArrayBuffer(packets, callback);
	  }

	  if (!packets.length) {
	    return callback('0:');
	  }

	  function setLengthHeader(message) {
	    return message.length + ':' + message;
	  }

	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, !isBinary ? false : supportsBinary, false, function(message) {
	      doneCallback(null, setLengthHeader(message));
	    });
	  }

	  map(packets, encodeOne, function(err, results) {
	    return callback(results.join(''));
	  });
	};

	/**
	 * Async array map using after
	 */

	function map(ary, each, done) {
	  var result = new Array(ary.length);
	  var next = after_1(ary.length, done);

	  var eachWithIndex = function(i, el, cb) {
	    each(el, function(error, msg) {
	      result[i] = msg;
	      cb(error, result);
	    });
	  };

	  for (var i = 0; i < ary.length; i++) {
	    eachWithIndex(i, ary[i], next);
	  }
	}

	/*
	 * Decodes data when a payload is maybe expected. Possible binary contents are
	 * decoded from their base64 representation
	 *
	 * @param {String} data, callback method
	 * @api public
	 */

	exports.decodePayload = function (data, binaryType, callback) {
	  if (typeof data !== 'string') {
	    return exports.decodePayloadAsBinary(data, binaryType, callback);
	  }

	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }

	  var packet;
	  if (data === '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }

	  var length = '', n, msg;

	  for (var i = 0, l = data.length; i < l; i++) {
	    var chr = data.charAt(i);

	    if (chr !== ':') {
	      length += chr;
	      continue;
	    }

	    if (length === '' || (length != (n = Number(length)))) {
	      // parser error - ignoring payload
	      return callback(err, 0, 1);
	    }

	    msg = data.substr(i + 1, n);

	    if (length != msg.length) {
	      // parser error - ignoring payload
	      return callback(err, 0, 1);
	    }

	    if (msg.length) {
	      packet = exports.decodePacket(msg, binaryType, false);

	      if (err.type === packet.type && err.data === packet.data) {
	        // parser error in individual packet - ignoring payload
	        return callback(err, 0, 1);
	      }

	      var ret = callback(packet, i + n, l);
	      if (false === ret) return;
	    }

	    // advance cursor
	    i += n;
	    length = '';
	  }

	  if (length !== '') {
	    // parser error - ignoring payload
	    return callback(err, 0, 1);
	  }

	};

	/**
	 * Encodes multiple messages (payload) as binary.
	 *
	 * <1 = binary, 0 = string><number from 0-9><number from 0-9>[...]<number
	 * 255><data>
	 *
	 * Example:
	 * 1 3 255 1 2 3, if the binary contents are interpreted as 8 bit integers
	 *
	 * @param {Array} packets
	 * @return {ArrayBuffer} encoded payload
	 * @api private
	 */

	exports.encodePayloadAsArrayBuffer = function(packets, callback) {
	  if (!packets.length) {
	    return callback(new ArrayBuffer(0));
	  }

	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(data) {
	      return doneCallback(null, data);
	    });
	  }

	  map(packets, encodeOne, function(err, encodedPackets) {
	    var totalLength = encodedPackets.reduce(function(acc, p) {
	      var len;
	      if (typeof p === 'string'){
	        len = p.length;
	      } else {
	        len = p.byteLength;
	      }
	      return acc + len.toString().length + len + 2; // string/binary identifier + separator = 2
	    }, 0);

	    var resultArray = new Uint8Array(totalLength);

	    var bufferIndex = 0;
	    encodedPackets.forEach(function(p) {
	      var isString = typeof p === 'string';
	      var ab = p;
	      if (isString) {
	        var view = new Uint8Array(p.length);
	        for (var i = 0; i < p.length; i++) {
	          view[i] = p.charCodeAt(i);
	        }
	        ab = view.buffer;
	      }

	      if (isString) { // not true binary
	        resultArray[bufferIndex++] = 0;
	      } else { // true binary
	        resultArray[bufferIndex++] = 1;
	      }

	      var lenStr = ab.byteLength.toString();
	      for (var i = 0; i < lenStr.length; i++) {
	        resultArray[bufferIndex++] = parseInt(lenStr[i]);
	      }
	      resultArray[bufferIndex++] = 255;

	      var view = new Uint8Array(ab);
	      for (var i = 0; i < view.length; i++) {
	        resultArray[bufferIndex++] = view[i];
	      }
	    });

	    return callback(resultArray.buffer);
	  });
	};

	/**
	 * Encode as Blob
	 */

	exports.encodePayloadAsBlob = function(packets, callback) {
	  function encodeOne(packet, doneCallback) {
	    exports.encodePacket(packet, true, true, function(encoded) {
	      var binaryIdentifier = new Uint8Array(1);
	      binaryIdentifier[0] = 1;
	      if (typeof encoded === 'string') {
	        var view = new Uint8Array(encoded.length);
	        for (var i = 0; i < encoded.length; i++) {
	          view[i] = encoded.charCodeAt(i);
	        }
	        encoded = view.buffer;
	        binaryIdentifier[0] = 0;
	      }

	      var len = (encoded instanceof ArrayBuffer)
	        ? encoded.byteLength
	        : encoded.size;

	      var lenStr = len.toString();
	      var lengthAry = new Uint8Array(lenStr.length + 1);
	      for (var i = 0; i < lenStr.length; i++) {
	        lengthAry[i] = parseInt(lenStr[i]);
	      }
	      lengthAry[lenStr.length] = 255;

	      if (blob) {
	        var blob$1 = new blob([binaryIdentifier.buffer, lengthAry.buffer, encoded]);
	        doneCallback(null, blob$1);
	      }
	    });
	  }

	  map(packets, encodeOne, function(err, results) {
	    return callback(new blob(results));
	  });
	};

	/*
	 * Decodes data when a payload is maybe expected. Strings are decoded by
	 * interpreting each byte as a key code for entries marked to start with 0. See
	 * description of encodePayloadAsBinary
	 *
	 * @param {ArrayBuffer} data, callback method
	 * @api public
	 */

	exports.decodePayloadAsBinary = function (data, binaryType, callback) {
	  if (typeof binaryType === 'function') {
	    callback = binaryType;
	    binaryType = null;
	  }

	  var bufferTail = data;
	  var buffers = [];

	  while (bufferTail.byteLength > 0) {
	    var tailArray = new Uint8Array(bufferTail);
	    var isString = tailArray[0] === 0;
	    var msgLength = '';

	    for (var i = 1; ; i++) {
	      if (tailArray[i] === 255) break;

	      // 310 = char length of Number.MAX_VALUE
	      if (msgLength.length > 310) {
	        return callback(err, 0, 1);
	      }

	      msgLength += tailArray[i];
	    }

	    bufferTail = arraybuffer_slice(bufferTail, 2 + msgLength.length);
	    msgLength = parseInt(msgLength);

	    var msg = arraybuffer_slice(bufferTail, 0, msgLength);
	    if (isString) {
	      try {
	        msg = String.fromCharCode.apply(null, new Uint8Array(msg));
	      } catch (e) {
	        // iPhone Safari doesn't let you apply to typed arrays
	        var typed = new Uint8Array(msg);
	        msg = '';
	        for (var i = 0; i < typed.length; i++) {
	          msg += String.fromCharCode(typed[i]);
	        }
	      }
	    }

	    buffers.push(msg);
	    bufferTail = arraybuffer_slice(bufferTail, msgLength);
	  }

	  var total = buffers.length;
	  buffers.forEach(function(buffer, i) {
	    callback(exports.decodePacket(buffer, binaryType, true), i, total);
	  });
	};
	});
	var browser_1$1 = browser$1.protocol;
	var browser_2$1 = browser$1.packets;
	var browser_3$1 = browser$1.encodePacket;
	var browser_4$1 = browser$1.encodeBase64Packet;
	var browser_5$1 = browser$1.decodePacket;
	var browser_6$1 = browser$1.decodeBase64Packet;
	var browser_7$1 = browser$1.encodePayload;
	var browser_8 = browser$1.decodePayload;
	var browser_9 = browser$1.encodePayloadAsArrayBuffer;
	var browser_10 = browser$1.encodePayloadAsBlob;
	var browser_11 = browser$1.decodePayloadAsBinary;

	/**
	 * Module dependencies.
	 */




	/**
	 * Module exports.
	 */

	var transport = Transport;

	/**
	 * Transport abstract constructor.
	 *
	 * @param {Object} options.
	 * @api private
	 */

	function Transport (opts) {
	  this.path = opts.path;
	  this.hostname = opts.hostname;
	  this.port = opts.port;
	  this.secure = opts.secure;
	  this.query = opts.query;
	  this.timestampParam = opts.timestampParam;
	  this.timestampRequests = opts.timestampRequests;
	  this.readyState = '';
	  this.agent = opts.agent || false;
	  this.socket = opts.socket;
	  this.enablesXDR = opts.enablesXDR;

	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;
	  this.forceNode = opts.forceNode;

	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;
	  this.localAddress = opts.localAddress;
	}

	/**
	 * Mix in `Emitter`.
	 */

	componentEmitter(Transport.prototype);

	/**
	 * Emits an error.
	 *
	 * @param {String} str
	 * @return {Transport} for chaining
	 * @api public
	 */

	Transport.prototype.onError = function (msg, desc) {
	  var err = new Error(msg);
	  err.type = 'TransportError';
	  err.description = desc;
	  this.emit('error', err);
	  return this;
	};

	/**
	 * Opens the transport.
	 *
	 * @api public
	 */

	Transport.prototype.open = function () {
	  if ('closed' === this.readyState || '' === this.readyState) {
	    this.readyState = 'opening';
	    this.doOpen();
	  }

	  return this;
	};

	/**
	 * Closes the transport.
	 *
	 * @api private
	 */

	Transport.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.doClose();
	    this.onClose();
	  }

	  return this;
	};

	/**
	 * Sends multiple packets.
	 *
	 * @param {Array} packets
	 * @api private
	 */

	Transport.prototype.send = function (packets) {
	  if ('open' === this.readyState) {
	    this.write(packets);
	  } else {
	    throw new Error('Transport not open');
	  }
	};

	/**
	 * Called upon open
	 *
	 * @api private
	 */

	Transport.prototype.onOpen = function () {
	  this.readyState = 'open';
	  this.writable = true;
	  this.emit('open');
	};

	/**
	 * Called with data.
	 *
	 * @param {String} data
	 * @api private
	 */

	Transport.prototype.onData = function (data) {
	  var packet = browser$1.decodePacket(data, this.socket.binaryType);
	  this.onPacket(packet);
	};

	/**
	 * Called with a decoded packet.
	 */

	Transport.prototype.onPacket = function (packet) {
	  this.emit('packet', packet);
	};

	/**
	 * Called upon close.
	 *
	 * @api private
	 */

	Transport.prototype.onClose = function () {
	  this.readyState = 'closed';
	  this.emit('close');
	};

	/**
	 * Compiles a querystring
	 * Returns string representation of the object
	 *
	 * @param {Object}
	 * @api private
	 */

	var encode = function (obj) {
	  var str = '';

	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      if (str.length) str += '&';
	      str += encodeURIComponent(i) + '=' + encodeURIComponent(obj[i]);
	    }
	  }

	  return str;
	};

	/**
	 * Parses a simple querystring into an object
	 *
	 * @param {String} qs
	 * @api private
	 */

	var decode = function(qs){
	  var qry = {};
	  var pairs = qs.split('&');
	  for (var i = 0, l = pairs.length; i < l; i++) {
	    var pair = pairs[i].split('=');
	    qry[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1]);
	  }
	  return qry;
	};

	var parseqs = {
		encode: encode,
		decode: decode
	};

	var componentInherit = function(a, b){
	  var fn = function(){};
	  fn.prototype = b.prototype;
	  a.prototype = new fn;
	  a.prototype.constructor = a;
	};

	var alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_'.split('')
	  , length = 64
	  , map = {}
	  , seed = 0
	  , i = 0
	  , prev;

	/**
	 * Return a string representing the specified number.
	 *
	 * @param {Number} num The number to convert.
	 * @returns {String} The string representation of the number.
	 * @api public
	 */
	function encode$1(num) {
	  var encoded = '';

	  do {
	    encoded = alphabet[num % length] + encoded;
	    num = Math.floor(num / length);
	  } while (num > 0);

	  return encoded;
	}

	/**
	 * Return the integer value specified by the given string.
	 *
	 * @param {String} str The string to convert.
	 * @returns {Number} The integer value represented by the string.
	 * @api public
	 */
	function decode$1(str) {
	  var decoded = 0;

	  for (i = 0; i < str.length; i++) {
	    decoded = decoded * length + map[str.charAt(i)];
	  }

	  return decoded;
	}

	/**
	 * Yeast: A tiny growing id generator.
	 *
	 * @returns {String} A unique id.
	 * @api public
	 */
	function yeast() {
	  var now = encode$1(+new Date());

	  if (now !== prev) return seed = 0, prev = now;
	  return now +'.'+ encode$1(seed++);
	}

	//
	// Map each character to its index.
	//
	for (; i < length; i++) map[alphabet[i]] = i;

	//
	// Expose the `yeast`, `encode` and `decode` functions.
	//
	yeast.encode = encode$1;
	yeast.decode = decode$1;
	var yeast_1 = yeast;

	/**
	 * Module dependencies.
	 */






	var debug$2 = browser('engine.io-client:polling');

	/**
	 * Module exports.
	 */

	var polling = Polling;

	/**
	 * Is XHR2 supported?
	 */

	var hasXHR2 = (function () {
	  var XMLHttpRequest = xmlhttprequest;
	  var xhr = new XMLHttpRequest({ xdomain: false });
	  return null != xhr.responseType;
	})();

	/**
	 * Polling interface.
	 *
	 * @param {Object} opts
	 * @api private
	 */

	function Polling (opts) {
	  var forceBase64 = (opts && opts.forceBase64);
	  if (!hasXHR2 || forceBase64) {
	    this.supportsBinary = false;
	  }
	  transport.call(this, opts);
	}

	/**
	 * Inherits from Transport.
	 */

	componentInherit(Polling, transport);

	/**
	 * Transport name.
	 */

	Polling.prototype.name = 'polling';

	/**
	 * Opens the socket (triggers polling). We write a PING message to determine
	 * when the transport is open.
	 *
	 * @api private
	 */

	Polling.prototype.doOpen = function () {
	  this.poll();
	};

	/**
	 * Pauses polling.
	 *
	 * @param {Function} callback upon buffers are flushed and transport is paused
	 * @api private
	 */

	Polling.prototype.pause = function (onPause) {
	  var self = this;

	  this.readyState = 'pausing';

	  function pause () {
	    debug$2('paused');
	    self.readyState = 'paused';
	    onPause();
	  }

	  if (this.polling || !this.writable) {
	    var total = 0;

	    if (this.polling) {
	      debug$2('we are currently polling - waiting to pause');
	      total++;
	      this.once('pollComplete', function () {
	        debug$2('pre-pause polling complete');
	        --total || pause();
	      });
	    }

	    if (!this.writable) {
	      debug$2('we are currently writing - waiting to pause');
	      total++;
	      this.once('drain', function () {
	        debug$2('pre-pause writing complete');
	        --total || pause();
	      });
	    }
	  } else {
	    pause();
	  }
	};

	/**
	 * Starts polling cycle.
	 *
	 * @api public
	 */

	Polling.prototype.poll = function () {
	  debug$2('polling');
	  this.polling = true;
	  this.doPoll();
	  this.emit('poll');
	};

	/**
	 * Overloads onData to detect payloads.
	 *
	 * @api private
	 */

	Polling.prototype.onData = function (data) {
	  var self = this;
	  debug$2('polling got data %s', data);
	  var callback = function (packet, index, total) {
	    // if its the first message we consider the transport open
	    if ('opening' === self.readyState) {
	      self.onOpen();
	    }

	    // if its a close packet, we close the ongoing requests
	    if ('close' === packet.type) {
	      self.onClose();
	      return false;
	    }

	    // otherwise bypass onData and handle the message
	    self.onPacket(packet);
	  };

	  // decode payload
	  browser$1.decodePayload(data, this.socket.binaryType, callback);

	  // if an event did not trigger closing
	  if ('closed' !== this.readyState) {
	    // if we got data we're not polling
	    this.polling = false;
	    this.emit('pollComplete');

	    if ('open' === this.readyState) {
	      this.poll();
	    } else {
	      debug$2('ignoring poll - transport state "%s"', this.readyState);
	    }
	  }
	};

	/**
	 * For polling, send a close packet.
	 *
	 * @api private
	 */

	Polling.prototype.doClose = function () {
	  var self = this;

	  function close () {
	    debug$2('writing close packet');
	    self.write([{ type: 'close' }]);
	  }

	  if ('open' === this.readyState) {
	    debug$2('transport open - closing');
	    close();
	  } else {
	    // in case we're trying to close while
	    // handshaking is in progress (GH-164)
	    debug$2('transport not open - deferring close');
	    this.once('open', close);
	  }
	};

	/**
	 * Writes a packets payload.
	 *
	 * @param {Array} data packets
	 * @param {Function} drain callback
	 * @api private
	 */

	Polling.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;
	  var callbackfn = function () {
	    self.writable = true;
	    self.emit('drain');
	  };

	  browser$1.encodePayload(packets, this.supportsBinary, function (data) {
	    self.doWrite(data, callbackfn);
	  });
	};

	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */

	Polling.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'https' : 'http';
	  var port = '';

	  // cache busting is forced
	  if (false !== this.timestampRequests) {
	    query[this.timestampParam] = yeast_1();
	  }

	  if (!this.supportsBinary && !query.sid) {
	    query.b64 = 1;
	  }

	  query = parseqs.encode(query);

	  // avoid port if default for schema
	  if (this.port && (('https' === schema && Number(this.port) !== 443) ||
	     ('http' === schema && Number(this.port) !== 80))) {
	    port = ':' + this.port;
	  }

	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }

	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};

	/**
	 * Module requirements.
	 */





	var debug$3 = browser('engine.io-client:polling-xhr');

	/**
	 * Module exports.
	 */

	var pollingXhr = XHR;
	var Request_1 = Request;

	/**
	 * Empty function
	 */

	function empty () {}

	/**
	 * XHR Polling constructor.
	 *
	 * @param {Object} opts
	 * @api public
	 */

	function XHR (opts) {
	  polling.call(this, opts);
	  this.requestTimeout = opts.requestTimeout;
	  this.extraHeaders = opts.extraHeaders;

	  if (commonjsGlobal.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;

	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }

	    this.xd = opts.hostname !== commonjsGlobal.location.hostname ||
	      port !== opts.port;
	    this.xs = opts.secure !== isSSL;
	  }
	}

	/**
	 * Inherits from Polling.
	 */

	componentInherit(XHR, polling);

	/**
	 * XHR supports binary
	 */

	XHR.prototype.supportsBinary = true;

	/**
	 * Creates a request.
	 *
	 * @param {String} method
	 * @api private
	 */

	XHR.prototype.request = function (opts) {
	  opts = opts || {};
	  opts.uri = this.uri();
	  opts.xd = this.xd;
	  opts.xs = this.xs;
	  opts.agent = this.agent || false;
	  opts.supportsBinary = this.supportsBinary;
	  opts.enablesXDR = this.enablesXDR;

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  opts.requestTimeout = this.requestTimeout;

	  // other options for Node.js client
	  opts.extraHeaders = this.extraHeaders;

	  return new Request(opts);
	};

	/**
	 * Sends data.
	 *
	 * @param {String} data to send.
	 * @param {Function} called upon flush.
	 * @api private
	 */

	XHR.prototype.doWrite = function (data, fn) {
	  var isBinary = typeof data !== 'string' && data !== undefined;
	  var req = this.request({ method: 'POST', data: data, isBinary: isBinary });
	  var self = this;
	  req.on('success', fn);
	  req.on('error', function (err) {
	    self.onError('xhr post error', err);
	  });
	  this.sendXhr = req;
	};

	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */

	XHR.prototype.doPoll = function () {
	  debug$3('xhr poll');
	  var req = this.request();
	  var self = this;
	  req.on('data', function (data) {
	    self.onData(data);
	  });
	  req.on('error', function (err) {
	    self.onError('xhr poll error', err);
	  });
	  this.pollXhr = req;
	};

	/**
	 * Request constructor
	 *
	 * @param {Object} options
	 * @api public
	 */

	function Request (opts) {
	  this.method = opts.method || 'GET';
	  this.uri = opts.uri;
	  this.xd = !!opts.xd;
	  this.xs = !!opts.xs;
	  this.async = false !== opts.async;
	  this.data = undefined !== opts.data ? opts.data : null;
	  this.agent = opts.agent;
	  this.isBinary = opts.isBinary;
	  this.supportsBinary = opts.supportsBinary;
	  this.enablesXDR = opts.enablesXDR;
	  this.requestTimeout = opts.requestTimeout;

	  // SSL options for Node.js client
	  this.pfx = opts.pfx;
	  this.key = opts.key;
	  this.passphrase = opts.passphrase;
	  this.cert = opts.cert;
	  this.ca = opts.ca;
	  this.ciphers = opts.ciphers;
	  this.rejectUnauthorized = opts.rejectUnauthorized;

	  // other options for Node.js client
	  this.extraHeaders = opts.extraHeaders;

	  this.create();
	}

	/**
	 * Mix in `Emitter`.
	 */

	componentEmitter(Request.prototype);

	/**
	 * Creates the XHR object and sends the request.
	 *
	 * @api private
	 */

	Request.prototype.create = function () {
	  var opts = { agent: this.agent, xdomain: this.xd, xscheme: this.xs, enablesXDR: this.enablesXDR };

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;

	  var xhr = this.xhr = new xmlhttprequest(opts);
	  var self = this;

	  try {
	    debug$3('xhr open %s: %s', this.method, this.uri);
	    xhr.open(this.method, this.uri, this.async);
	    try {
	      if (this.extraHeaders) {
	        xhr.setDisableHeaderCheck && xhr.setDisableHeaderCheck(true);
	        for (var i in this.extraHeaders) {
	          if (this.extraHeaders.hasOwnProperty(i)) {
	            xhr.setRequestHeader(i, this.extraHeaders[i]);
	          }
	        }
	      }
	    } catch (e) {}

	    if ('POST' === this.method) {
	      try {
	        if (this.isBinary) {
	          xhr.setRequestHeader('Content-type', 'application/octet-stream');
	        } else {
	          xhr.setRequestHeader('Content-type', 'text/plain;charset=UTF-8');
	        }
	      } catch (e) {}
	    }

	    try {
	      xhr.setRequestHeader('Accept', '*/*');
	    } catch (e) {}

	    // ie6 check
	    if ('withCredentials' in xhr) {
	      xhr.withCredentials = true;
	    }

	    if (this.requestTimeout) {
	      xhr.timeout = this.requestTimeout;
	    }

	    if (this.hasXDR()) {
	      xhr.onload = function () {
	        self.onLoad();
	      };
	      xhr.onerror = function () {
	        self.onError(xhr.responseText);
	      };
	    } else {
	      xhr.onreadystatechange = function () {
	        if (xhr.readyState === 2) {
	          try {
	            var contentType = xhr.getResponseHeader('Content-Type');
	            if (self.supportsBinary && contentType === 'application/octet-stream') {
	              xhr.responseType = 'arraybuffer';
	            }
	          } catch (e) {}
	        }
	        if (4 !== xhr.readyState) return;
	        if (200 === xhr.status || 1223 === xhr.status) {
	          self.onLoad();
	        } else {
	          // make sure the `error` event handler that's user-set
	          // does not throw in the same tick and gets caught here
	          setTimeout(function () {
	            self.onError(xhr.status);
	          }, 0);
	        }
	      };
	    }

	    debug$3('xhr data %s', this.data);
	    xhr.send(this.data);
	  } catch (e) {
	    // Need to defer since .create() is called directly fhrom the constructor
	    // and thus the 'error' event can only be only bound *after* this exception
	    // occurs.  Therefore, also, we cannot throw here at all.
	    setTimeout(function () {
	      self.onError(e);
	    }, 0);
	    return;
	  }

	  if (commonjsGlobal.document) {
	    this.index = Request.requestsCount++;
	    Request.requests[this.index] = this;
	  }
	};

	/**
	 * Called upon successful response.
	 *
	 * @api private
	 */

	Request.prototype.onSuccess = function () {
	  this.emit('success');
	  this.cleanup();
	};

	/**
	 * Called if we have data.
	 *
	 * @api private
	 */

	Request.prototype.onData = function (data) {
	  this.emit('data', data);
	  this.onSuccess();
	};

	/**
	 * Called upon error.
	 *
	 * @api private
	 */

	Request.prototype.onError = function (err) {
	  this.emit('error', err);
	  this.cleanup(true);
	};

	/**
	 * Cleans up house.
	 *
	 * @api private
	 */

	Request.prototype.cleanup = function (fromError) {
	  if ('undefined' === typeof this.xhr || null === this.xhr) {
	    return;
	  }
	  // xmlhttprequest
	  if (this.hasXDR()) {
	    this.xhr.onload = this.xhr.onerror = empty;
	  } else {
	    this.xhr.onreadystatechange = empty;
	  }

	  if (fromError) {
	    try {
	      this.xhr.abort();
	    } catch (e) {}
	  }

	  if (commonjsGlobal.document) {
	    delete Request.requests[this.index];
	  }

	  this.xhr = null;
	};

	/**
	 * Called upon load.
	 *
	 * @api private
	 */

	Request.prototype.onLoad = function () {
	  var data;
	  try {
	    var contentType;
	    try {
	      contentType = this.xhr.getResponseHeader('Content-Type');
	    } catch (e) {}
	    if (contentType === 'application/octet-stream') {
	      data = this.xhr.response || this.xhr.responseText;
	    } else {
	      data = this.xhr.responseText;
	    }
	  } catch (e) {
	    this.onError(e);
	  }
	  if (null != data) {
	    this.onData(data);
	  }
	};

	/**
	 * Check if it has XDomainRequest.
	 *
	 * @api private
	 */

	Request.prototype.hasXDR = function () {
	  return 'undefined' !== typeof commonjsGlobal.XDomainRequest && !this.xs && this.enablesXDR;
	};

	/**
	 * Aborts the request.
	 *
	 * @api public
	 */

	Request.prototype.abort = function () {
	  this.cleanup();
	};

	/**
	 * Aborts pending requests when unloading the window. This is needed to prevent
	 * memory leaks (e.g. when using IE) and to ensure that no spurious error is
	 * emitted.
	 */

	Request.requestsCount = 0;
	Request.requests = {};

	if (commonjsGlobal.document) {
	  if (commonjsGlobal.attachEvent) {
	    commonjsGlobal.attachEvent('onunload', unloadHandler);
	  } else if (commonjsGlobal.addEventListener) {
	    commonjsGlobal.addEventListener('beforeunload', unloadHandler, false);
	  }
	}

	function unloadHandler () {
	  for (var i in Request.requests) {
	    if (Request.requests.hasOwnProperty(i)) {
	      Request.requests[i].abort();
	    }
	  }
	}
	pollingXhr.Request = Request_1;

	/**
	 * Module requirements.
	 */




	/**
	 * Module exports.
	 */

	var pollingJsonp = JSONPPolling;

	/**
	 * Cached regular expressions.
	 */

	var rNewline = /\n/g;
	var rEscapedNewline = /\\n/g;

	/**
	 * Global JSONP callbacks.
	 */

	var callbacks;

	/**
	 * Noop.
	 */

	function empty$1 () { }

	/**
	 * JSONP Polling constructor.
	 *
	 * @param {Object} opts.
	 * @api public
	 */

	function JSONPPolling (opts) {
	  polling.call(this, opts);

	  this.query = this.query || {};

	  // define global callbacks array if not present
	  // we do this here (lazily) to avoid unneeded global pollution
	  if (!callbacks) {
	    // we need to consider multiple engines in the same page
	    if (!commonjsGlobal.___eio) commonjsGlobal.___eio = [];
	    callbacks = commonjsGlobal.___eio;
	  }

	  // callback identifier
	  this.index = callbacks.length;

	  // add callback to jsonp global
	  var self = this;
	  callbacks.push(function (msg) {
	    self.onData(msg);
	  });

	  // append to query string
	  this.query.j = this.index;

	  // prevent spurious errors from being emitted when the window is unloaded
	  if (commonjsGlobal.document && commonjsGlobal.addEventListener) {
	    commonjsGlobal.addEventListener('beforeunload', function () {
	      if (self.script) self.script.onerror = empty$1;
	    }, false);
	  }
	}

	/**
	 * Inherits from Polling.
	 */

	componentInherit(JSONPPolling, polling);

	/*
	 * JSONP only supports binary as base64 encoded strings
	 */

	JSONPPolling.prototype.supportsBinary = false;

	/**
	 * Closes the socket.
	 *
	 * @api private
	 */

	JSONPPolling.prototype.doClose = function () {
	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }

	  if (this.form) {
	    this.form.parentNode.removeChild(this.form);
	    this.form = null;
	    this.iframe = null;
	  }

	  polling.prototype.doClose.call(this);
	};

	/**
	 * Starts a poll cycle.
	 *
	 * @api private
	 */

	JSONPPolling.prototype.doPoll = function () {
	  var self = this;
	  var script = document.createElement('script');

	  if (this.script) {
	    this.script.parentNode.removeChild(this.script);
	    this.script = null;
	  }

	  script.async = true;
	  script.src = this.uri();
	  script.onerror = function (e) {
	    self.onError('jsonp poll error', e);
	  };

	  var insertAt = document.getElementsByTagName('script')[0];
	  if (insertAt) {
	    insertAt.parentNode.insertBefore(script, insertAt);
	  } else {
	    (document.head || document.body).appendChild(script);
	  }
	  this.script = script;

	  var isUAgecko = 'undefined' !== typeof navigator && /gecko/i.test(navigator.userAgent);

	  if (isUAgecko) {
	    setTimeout(function () {
	      var iframe = document.createElement('iframe');
	      document.body.appendChild(iframe);
	      document.body.removeChild(iframe);
	    }, 100);
	  }
	};

	/**
	 * Writes with a hidden iframe.
	 *
	 * @param {String} data to send
	 * @param {Function} called upon flush.
	 * @api private
	 */

	JSONPPolling.prototype.doWrite = function (data, fn) {
	  var self = this;

	  if (!this.form) {
	    var form = document.createElement('form');
	    var area = document.createElement('textarea');
	    var id = this.iframeId = 'eio_iframe_' + this.index;
	    var iframe;

	    form.className = 'socketio';
	    form.style.position = 'absolute';
	    form.style.top = '-1000px';
	    form.style.left = '-1000px';
	    form.target = id;
	    form.method = 'POST';
	    form.setAttribute('accept-charset', 'utf-8');
	    area.name = 'd';
	    form.appendChild(area);
	    document.body.appendChild(form);

	    this.form = form;
	    this.area = area;
	  }

	  this.form.action = this.uri();

	  function complete () {
	    initIframe();
	    fn();
	  }

	  function initIframe () {
	    if (self.iframe) {
	      try {
	        self.form.removeChild(self.iframe);
	      } catch (e) {
	        self.onError('jsonp polling iframe removal error', e);
	      }
	    }

	    try {
	      // ie6 dynamic iframes with target="" support (thanks Chris Lambacher)
	      var html = '<iframe src="javascript:0" name="' + self.iframeId + '">';
	      iframe = document.createElement(html);
	    } catch (e) {
	      iframe = document.createElement('iframe');
	      iframe.name = self.iframeId;
	      iframe.src = 'javascript:0';
	    }

	    iframe.id = self.iframeId;

	    self.form.appendChild(iframe);
	    self.iframe = iframe;
	  }

	  initIframe();

	  // escape \n to prevent it from being converted into \r\n by some UAs
	  // double escaping is required for escaped new lines because unescaping of new lines can be done safely on server-side
	  data = data.replace(rEscapedNewline, '\\\n');
	  this.area.value = data.replace(rNewline, '\\n');

	  try {
	    this.form.submit();
	  } catch (e) {}

	  if (this.iframe.attachEvent) {
	    this.iframe.onreadystatechange = function () {
	      if (self.iframe.readyState === 'complete') {
	        complete();
	      }
	    };
	  } else {
	    this.iframe.onload = complete;
	  }
	};

	var _nodeResolve_empty = {};

	var _nodeResolve_empty$1 = /*#__PURE__*/Object.freeze({
		__proto__: null,
		'default': _nodeResolve_empty
	});

	var require$$1 = getCjsExportFromNamespace(_nodeResolve_empty$1);

	/**
	 * Module dependencies.
	 */






	var debug$4 = browser('engine.io-client:websocket');
	var BrowserWebSocket = commonjsGlobal.WebSocket || commonjsGlobal.MozWebSocket;
	var NodeWebSocket;
	if (typeof window === 'undefined') {
	  try {
	    NodeWebSocket = require$$1;
	  } catch (e) { }
	}

	/**
	 * Get either the `WebSocket` or `MozWebSocket` globals
	 * in the browser or try to resolve WebSocket-compatible
	 * interface exposed by `ws` for Node-like environment.
	 */

	var WebSocket$1 = BrowserWebSocket;
	if (!WebSocket$1 && typeof window === 'undefined') {
	  WebSocket$1 = NodeWebSocket;
	}

	/**
	 * Module exports.
	 */

	var websocket = WS;

	/**
	 * WebSocket transport constructor.
	 *
	 * @api {Object} connection options
	 * @api public
	 */

	function WS (opts) {
	  var forceBase64 = (opts && opts.forceBase64);
	  if (forceBase64) {
	    this.supportsBinary = false;
	  }
	  this.perMessageDeflate = opts.perMessageDeflate;
	  this.usingBrowserWebSocket = BrowserWebSocket && !opts.forceNode;
	  this.protocols = opts.protocols;
	  if (!this.usingBrowserWebSocket) {
	    WebSocket$1 = NodeWebSocket;
	  }
	  transport.call(this, opts);
	}

	/**
	 * Inherits from Transport.
	 */

	componentInherit(WS, transport);

	/**
	 * Transport name.
	 *
	 * @api public
	 */

	WS.prototype.name = 'websocket';

	/*
	 * WebSockets support binary
	 */

	WS.prototype.supportsBinary = true;

	/**
	 * Opens socket.
	 *
	 * @api private
	 */

	WS.prototype.doOpen = function () {
	  if (!this.check()) {
	    // let probe timeout
	    return;
	  }

	  var uri = this.uri();
	  var protocols = this.protocols;
	  var opts = {
	    agent: this.agent,
	    perMessageDeflate: this.perMessageDeflate
	  };

	  // SSL options for Node.js client
	  opts.pfx = this.pfx;
	  opts.key = this.key;
	  opts.passphrase = this.passphrase;
	  opts.cert = this.cert;
	  opts.ca = this.ca;
	  opts.ciphers = this.ciphers;
	  opts.rejectUnauthorized = this.rejectUnauthorized;
	  if (this.extraHeaders) {
	    opts.headers = this.extraHeaders;
	  }
	  if (this.localAddress) {
	    opts.localAddress = this.localAddress;
	  }

	  try {
	    this.ws = this.usingBrowserWebSocket ? (protocols ? new WebSocket$1(uri, protocols) : new WebSocket$1(uri)) : new WebSocket$1(uri, protocols, opts);
	  } catch (err) {
	    return this.emit('error', err);
	  }

	  if (this.ws.binaryType === undefined) {
	    this.supportsBinary = false;
	  }

	  if (this.ws.supports && this.ws.supports.binary) {
	    this.supportsBinary = true;
	    this.ws.binaryType = 'nodebuffer';
	  } else {
	    this.ws.binaryType = 'arraybuffer';
	  }

	  this.addEventListeners();
	};

	/**
	 * Adds event listeners to the socket
	 *
	 * @api private
	 */

	WS.prototype.addEventListeners = function () {
	  var self = this;

	  this.ws.onopen = function () {
	    self.onOpen();
	  };
	  this.ws.onclose = function () {
	    self.onClose();
	  };
	  this.ws.onmessage = function (ev) {
	    self.onData(ev.data);
	  };
	  this.ws.onerror = function (e) {
	    self.onError('websocket error', e);
	  };
	};

	/**
	 * Writes data to socket.
	 *
	 * @param {Array} array of packets.
	 * @api private
	 */

	WS.prototype.write = function (packets) {
	  var self = this;
	  this.writable = false;

	  // encodePacket efficient as it uses WS framing
	  // no need for encodePayload
	  var total = packets.length;
	  for (var i = 0, l = total; i < l; i++) {
	    (function (packet) {
	      browser$1.encodePacket(packet, self.supportsBinary, function (data) {
	        if (!self.usingBrowserWebSocket) {
	          // always create a new object (GH-437)
	          var opts = {};
	          if (packet.options) {
	            opts.compress = packet.options.compress;
	          }

	          if (self.perMessageDeflate) {
	            var len = 'string' === typeof data ? commonjsGlobal.Buffer.byteLength(data) : data.length;
	            if (len < self.perMessageDeflate.threshold) {
	              opts.compress = false;
	            }
	          }
	        }

	        // Sometimes the websocket has already been closed but the browser didn't
	        // have a chance of informing us about it yet, in that case send will
	        // throw an error
	        try {
	          if (self.usingBrowserWebSocket) {
	            // TypeError is thrown when passing the second argument on Safari
	            self.ws.send(data);
	          } else {
	            self.ws.send(data, opts);
	          }
	        } catch (e) {
	          debug$4('websocket closed before onclose event');
	        }

	        --total || done();
	      });
	    })(packets[i]);
	  }

	  function done () {
	    self.emit('flush');

	    // fake drain
	    // defer to next tick to allow Socket to clear writeBuffer
	    setTimeout(function () {
	      self.writable = true;
	      self.emit('drain');
	    }, 0);
	  }
	};

	/**
	 * Called upon close
	 *
	 * @api private
	 */

	WS.prototype.onClose = function () {
	  transport.prototype.onClose.call(this);
	};

	/**
	 * Closes socket.
	 *
	 * @api private
	 */

	WS.prototype.doClose = function () {
	  if (typeof this.ws !== 'undefined') {
	    this.ws.close();
	  }
	};

	/**
	 * Generates uri for connection.
	 *
	 * @api private
	 */

	WS.prototype.uri = function () {
	  var query = this.query || {};
	  var schema = this.secure ? 'wss' : 'ws';
	  var port = '';

	  // avoid port if default for schema
	  if (this.port && (('wss' === schema && Number(this.port) !== 443) ||
	    ('ws' === schema && Number(this.port) !== 80))) {
	    port = ':' + this.port;
	  }

	  // append timestamp to URI
	  if (this.timestampRequests) {
	    query[this.timestampParam] = yeast_1();
	  }

	  // communicate binary support capabilities
	  if (!this.supportsBinary) {
	    query.b64 = 1;
	  }

	  query = parseqs.encode(query);

	  // prepend ? to query
	  if (query.length) {
	    query = '?' + query;
	  }

	  var ipv6 = this.hostname.indexOf(':') !== -1;
	  return schema + '://' + (ipv6 ? '[' + this.hostname + ']' : this.hostname) + port + this.path + query;
	};

	/**
	 * Feature detection for WebSocket.
	 *
	 * @return {Boolean} whether this transport is available.
	 * @api public
	 */

	WS.prototype.check = function () {
	  return !!WebSocket$1 && !('__initialize' in WebSocket$1 && this.name === WS.prototype.name);
	};

	/**
	 * Module dependencies
	 */






	/**
	 * Export transports.
	 */

	var polling_1 = polling$1;
	var websocket_1 = websocket;

	/**
	 * Polling transport polymorphic constructor.
	 * Decides on xhr vs jsonp based on feature detection.
	 *
	 * @api private
	 */

	function polling$1 (opts) {
	  var xhr;
	  var xd = false;
	  var xs = false;
	  var jsonp = false !== opts.jsonp;

	  if (commonjsGlobal.location) {
	    var isSSL = 'https:' === location.protocol;
	    var port = location.port;

	    // some user agents have empty `location.port`
	    if (!port) {
	      port = isSSL ? 443 : 80;
	    }

	    xd = opts.hostname !== location.hostname || port !== opts.port;
	    xs = opts.secure !== isSSL;
	  }

	  opts.xdomain = xd;
	  opts.xscheme = xs;
	  xhr = new xmlhttprequest(opts);

	  if ('open' in xhr && !opts.forceJSONP) {
	    return new pollingXhr(opts);
	  } else {
	    if (!jsonp) throw new Error('JSONP disabled');
	    return new pollingJsonp(opts);
	  }
	}

	var transports = {
		polling: polling_1,
		websocket: websocket_1
	};

	var indexOf$1 = [].indexOf;

	var indexof = function(arr, obj){
	  if (indexOf$1) return arr.indexOf(obj);
	  for (var i = 0; i < arr.length; ++i) {
	    if (arr[i] === obj) return i;
	  }
	  return -1;
	};

	/**
	 * Module dependencies.
	 */



	var debug$5 = browser('engine.io-client:socket');





	/**
	 * Module exports.
	 */

	var socket = Socket;

	/**
	 * Socket constructor.
	 *
	 * @param {String|Object} uri or options
	 * @param {Object} options
	 * @api public
	 */

	function Socket (uri, opts) {
	  if (!(this instanceof Socket)) return new Socket(uri, opts);

	  opts = opts || {};

	  if (uri && 'object' === typeof uri) {
	    opts = uri;
	    uri = null;
	  }

	  if (uri) {
	    uri = parseuri(uri);
	    opts.hostname = uri.host;
	    opts.secure = uri.protocol === 'https' || uri.protocol === 'wss';
	    opts.port = uri.port;
	    if (uri.query) opts.query = uri.query;
	  } else if (opts.host) {
	    opts.hostname = parseuri(opts.host).host;
	  }

	  this.secure = null != opts.secure ? opts.secure
	    : (commonjsGlobal.location && 'https:' === location.protocol);

	  if (opts.hostname && !opts.port) {
	    // if no port is specified manually, use the protocol default
	    opts.port = this.secure ? '443' : '80';
	  }

	  this.agent = opts.agent || false;
	  this.hostname = opts.hostname ||
	    (commonjsGlobal.location ? location.hostname : 'localhost');
	  this.port = opts.port || (commonjsGlobal.location && location.port
	      ? location.port
	      : (this.secure ? 443 : 80));
	  this.query = opts.query || {};
	  if ('string' === typeof this.query) this.query = parseqs.decode(this.query);
	  this.upgrade = false !== opts.upgrade;
	  this.path = (opts.path || '/engine.io').replace(/\/$/, '') + '/';
	  this.forceJSONP = !!opts.forceJSONP;
	  this.jsonp = false !== opts.jsonp;
	  this.forceBase64 = !!opts.forceBase64;
	  this.enablesXDR = !!opts.enablesXDR;
	  this.timestampParam = opts.timestampParam || 't';
	  this.timestampRequests = opts.timestampRequests;
	  this.transports = opts.transports || ['polling', 'websocket'];
	  this.transportOptions = opts.transportOptions || {};
	  this.readyState = '';
	  this.writeBuffer = [];
	  this.prevBufferLen = 0;
	  this.policyPort = opts.policyPort || 843;
	  this.rememberUpgrade = opts.rememberUpgrade || false;
	  this.binaryType = null;
	  this.onlyBinaryUpgrades = opts.onlyBinaryUpgrades;
	  this.perMessageDeflate = false !== opts.perMessageDeflate ? (opts.perMessageDeflate || {}) : false;

	  if (true === this.perMessageDeflate) this.perMessageDeflate = {};
	  if (this.perMessageDeflate && null == this.perMessageDeflate.threshold) {
	    this.perMessageDeflate.threshold = 1024;
	  }

	  // SSL options for Node.js client
	  this.pfx = opts.pfx || null;
	  this.key = opts.key || null;
	  this.passphrase = opts.passphrase || null;
	  this.cert = opts.cert || null;
	  this.ca = opts.ca || null;
	  this.ciphers = opts.ciphers || null;
	  this.rejectUnauthorized = opts.rejectUnauthorized === undefined ? true : opts.rejectUnauthorized;
	  this.forceNode = !!opts.forceNode;

	  // other options for Node.js client
	  var freeGlobal = typeof commonjsGlobal === 'object' && commonjsGlobal;
	  if (freeGlobal.global === freeGlobal) {
	    if (opts.extraHeaders && Object.keys(opts.extraHeaders).length > 0) {
	      this.extraHeaders = opts.extraHeaders;
	    }

	    if (opts.localAddress) {
	      this.localAddress = opts.localAddress;
	    }
	  }

	  // set on handshake
	  this.id = null;
	  this.upgrades = null;
	  this.pingInterval = null;
	  this.pingTimeout = null;

	  // set on heartbeat
	  this.pingIntervalTimer = null;
	  this.pingTimeoutTimer = null;

	  this.open();
	}

	Socket.priorWebsocketSuccess = false;

	/**
	 * Mix in `Emitter`.
	 */

	componentEmitter(Socket.prototype);

	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	Socket.protocol = browser$1.protocol; // this is an int

	/**
	 * Expose deps for legacy compatibility
	 * and standalone browser access.
	 */

	Socket.Socket = Socket;
	Socket.Transport = transport;
	Socket.transports = transports;
	Socket.parser = browser$1;

	/**
	 * Creates transport of the given type.
	 *
	 * @param {String} transport name
	 * @return {Transport}
	 * @api private
	 */

	Socket.prototype.createTransport = function (name) {
	  debug$5('creating transport "%s"', name);
	  var query = clone(this.query);

	  // append engine.io protocol identifier
	  query.EIO = browser$1.protocol;

	  // transport name
	  query.transport = name;

	  // per-transport options
	  var options = this.transportOptions[name] || {};

	  // session id if we already have one
	  if (this.id) query.sid = this.id;

	  var transport = new transports[name]({
	    query: query,
	    socket: this,
	    agent: options.agent || this.agent,
	    hostname: options.hostname || this.hostname,
	    port: options.port || this.port,
	    secure: options.secure || this.secure,
	    path: options.path || this.path,
	    forceJSONP: options.forceJSONP || this.forceJSONP,
	    jsonp: options.jsonp || this.jsonp,
	    forceBase64: options.forceBase64 || this.forceBase64,
	    enablesXDR: options.enablesXDR || this.enablesXDR,
	    timestampRequests: options.timestampRequests || this.timestampRequests,
	    timestampParam: options.timestampParam || this.timestampParam,
	    policyPort: options.policyPort || this.policyPort,
	    pfx: options.pfx || this.pfx,
	    key: options.key || this.key,
	    passphrase: options.passphrase || this.passphrase,
	    cert: options.cert || this.cert,
	    ca: options.ca || this.ca,
	    ciphers: options.ciphers || this.ciphers,
	    rejectUnauthorized: options.rejectUnauthorized || this.rejectUnauthorized,
	    perMessageDeflate: options.perMessageDeflate || this.perMessageDeflate,
	    extraHeaders: options.extraHeaders || this.extraHeaders,
	    forceNode: options.forceNode || this.forceNode,
	    localAddress: options.localAddress || this.localAddress,
	    requestTimeout: options.requestTimeout || this.requestTimeout,
	    protocols: options.protocols || void (0)
	  });

	  return transport;
	};

	function clone (obj) {
	  var o = {};
	  for (var i in obj) {
	    if (obj.hasOwnProperty(i)) {
	      o[i] = obj[i];
	    }
	  }
	  return o;
	}

	/**
	 * Initializes transport to use and starts probe.
	 *
	 * @api private
	 */
	Socket.prototype.open = function () {
	  var transport;
	  if (this.rememberUpgrade && Socket.priorWebsocketSuccess && this.transports.indexOf('websocket') !== -1) {
	    transport = 'websocket';
	  } else if (0 === this.transports.length) {
	    // Emit error on next tick so it can be listened to
	    var self = this;
	    setTimeout(function () {
	      self.emit('error', 'No transports available');
	    }, 0);
	    return;
	  } else {
	    transport = this.transports[0];
	  }
	  this.readyState = 'opening';

	  // Retry with the next transport if the transport is disabled (jsonp: false)
	  try {
	    transport = this.createTransport(transport);
	  } catch (e) {
	    this.transports.shift();
	    this.open();
	    return;
	  }

	  transport.open();
	  this.setTransport(transport);
	};

	/**
	 * Sets the current transport. Disables the existing one (if any).
	 *
	 * @api private
	 */

	Socket.prototype.setTransport = function (transport) {
	  debug$5('setting transport %s', transport.name);
	  var self = this;

	  if (this.transport) {
	    debug$5('clearing existing transport %s', this.transport.name);
	    this.transport.removeAllListeners();
	  }

	  // set up transport
	  this.transport = transport;

	  // set up transport listeners
	  transport
	  .on('drain', function () {
	    self.onDrain();
	  })
	  .on('packet', function (packet) {
	    self.onPacket(packet);
	  })
	  .on('error', function (e) {
	    self.onError(e);
	  })
	  .on('close', function () {
	    self.onClose('transport close');
	  });
	};

	/**
	 * Probes a transport.
	 *
	 * @param {String} transport name
	 * @api private
	 */

	Socket.prototype.probe = function (name) {
	  debug$5('probing transport "%s"', name);
	  var transport = this.createTransport(name, { probe: 1 });
	  var failed = false;
	  var self = this;

	  Socket.priorWebsocketSuccess = false;

	  function onTransportOpen () {
	    if (self.onlyBinaryUpgrades) {
	      var upgradeLosesBinary = !this.supportsBinary && self.transport.supportsBinary;
	      failed = failed || upgradeLosesBinary;
	    }
	    if (failed) return;

	    debug$5('probe transport "%s" opened', name);
	    transport.send([{ type: 'ping', data: 'probe' }]);
	    transport.once('packet', function (msg) {
	      if (failed) return;
	      if ('pong' === msg.type && 'probe' === msg.data) {
	        debug$5('probe transport "%s" pong', name);
	        self.upgrading = true;
	        self.emit('upgrading', transport);
	        if (!transport) return;
	        Socket.priorWebsocketSuccess = 'websocket' === transport.name;

	        debug$5('pausing current transport "%s"', self.transport.name);
	        self.transport.pause(function () {
	          if (failed) return;
	          if ('closed' === self.readyState) return;
	          debug$5('changing transport and sending upgrade packet');

	          cleanup();

	          self.setTransport(transport);
	          transport.send([{ type: 'upgrade' }]);
	          self.emit('upgrade', transport);
	          transport = null;
	          self.upgrading = false;
	          self.flush();
	        });
	      } else {
	        debug$5('probe transport "%s" failed', name);
	        var err = new Error('probe error');
	        err.transport = transport.name;
	        self.emit('upgradeError', err);
	      }
	    });
	  }

	  function freezeTransport () {
	    if (failed) return;

	    // Any callback called by transport should be ignored since now
	    failed = true;

	    cleanup();

	    transport.close();
	    transport = null;
	  }

	  // Handle any error that happens while probing
	  function onerror (err) {
	    var error = new Error('probe error: ' + err);
	    error.transport = transport.name;

	    freezeTransport();

	    debug$5('probe transport "%s" failed because of error: %s', name, err);

	    self.emit('upgradeError', error);
	  }

	  function onTransportClose () {
	    onerror('transport closed');
	  }

	  // When the socket is closed while we're probing
	  function onclose () {
	    onerror('socket closed');
	  }

	  // When the socket is upgraded while we're probing
	  function onupgrade (to) {
	    if (transport && to.name !== transport.name) {
	      debug$5('"%s" works - aborting "%s"', to.name, transport.name);
	      freezeTransport();
	    }
	  }

	  // Remove all listeners on the transport and on self
	  function cleanup () {
	    transport.removeListener('open', onTransportOpen);
	    transport.removeListener('error', onerror);
	    transport.removeListener('close', onTransportClose);
	    self.removeListener('close', onclose);
	    self.removeListener('upgrading', onupgrade);
	  }

	  transport.once('open', onTransportOpen);
	  transport.once('error', onerror);
	  transport.once('close', onTransportClose);

	  this.once('close', onclose);
	  this.once('upgrading', onupgrade);

	  transport.open();
	};

	/**
	 * Called when connection is deemed open.
	 *
	 * @api public
	 */

	Socket.prototype.onOpen = function () {
	  debug$5('socket open');
	  this.readyState = 'open';
	  Socket.priorWebsocketSuccess = 'websocket' === this.transport.name;
	  this.emit('open');
	  this.flush();

	  // we check for `readyState` in case an `open`
	  // listener already closed the socket
	  if ('open' === this.readyState && this.upgrade && this.transport.pause) {
	    debug$5('starting upgrade probes');
	    for (var i = 0, l = this.upgrades.length; i < l; i++) {
	      this.probe(this.upgrades[i]);
	    }
	  }
	};

	/**
	 * Handles a packet.
	 *
	 * @api private
	 */

	Socket.prototype.onPacket = function (packet) {
	  if ('opening' === this.readyState || 'open' === this.readyState ||
	      'closing' === this.readyState) {
	    debug$5('socket receive: type "%s", data "%s"', packet.type, packet.data);

	    this.emit('packet', packet);

	    // Socket is live - any packet counts
	    this.emit('heartbeat');

	    switch (packet.type) {
	      case 'open':
	        this.onHandshake(JSON.parse(packet.data));
	        break;

	      case 'pong':
	        this.setPing();
	        this.emit('pong');
	        break;

	      case 'error':
	        var err = new Error('server error');
	        err.code = packet.data;
	        this.onError(err);
	        break;

	      case 'message':
	        this.emit('data', packet.data);
	        this.emit('message', packet.data);
	        break;
	    }
	  } else {
	    debug$5('packet received with socket readyState "%s"', this.readyState);
	  }
	};

	/**
	 * Called upon handshake completion.
	 *
	 * @param {Object} handshake obj
	 * @api private
	 */

	Socket.prototype.onHandshake = function (data) {
	  this.emit('handshake', data);
	  this.id = data.sid;
	  this.transport.query.sid = data.sid;
	  this.upgrades = this.filterUpgrades(data.upgrades);
	  this.pingInterval = data.pingInterval;
	  this.pingTimeout = data.pingTimeout;
	  this.onOpen();
	  // In case open handler closes socket
	  if ('closed' === this.readyState) return;
	  this.setPing();

	  // Prolong liveness of socket on heartbeat
	  this.removeListener('heartbeat', this.onHeartbeat);
	  this.on('heartbeat', this.onHeartbeat);
	};

	/**
	 * Resets ping timeout.
	 *
	 * @api private
	 */

	Socket.prototype.onHeartbeat = function (timeout) {
	  clearTimeout(this.pingTimeoutTimer);
	  var self = this;
	  self.pingTimeoutTimer = setTimeout(function () {
	    if ('closed' === self.readyState) return;
	    self.onClose('ping timeout');
	  }, timeout || (self.pingInterval + self.pingTimeout));
	};

	/**
	 * Pings server every `this.pingInterval` and expects response
	 * within `this.pingTimeout` or closes connection.
	 *
	 * @api private
	 */

	Socket.prototype.setPing = function () {
	  var self = this;
	  clearTimeout(self.pingIntervalTimer);
	  self.pingIntervalTimer = setTimeout(function () {
	    debug$5('writing ping packet - expecting pong within %sms', self.pingTimeout);
	    self.ping();
	    self.onHeartbeat(self.pingTimeout);
	  }, self.pingInterval);
	};

	/**
	* Sends a ping packet.
	*
	* @api private
	*/

	Socket.prototype.ping = function () {
	  var self = this;
	  this.sendPacket('ping', function () {
	    self.emit('ping');
	  });
	};

	/**
	 * Called on `drain` event
	 *
	 * @api private
	 */

	Socket.prototype.onDrain = function () {
	  this.writeBuffer.splice(0, this.prevBufferLen);

	  // setting prevBufferLen = 0 is very important
	  // for example, when upgrading, upgrade packet is sent over,
	  // and a nonzero prevBufferLen could cause problems on `drain`
	  this.prevBufferLen = 0;

	  if (0 === this.writeBuffer.length) {
	    this.emit('drain');
	  } else {
	    this.flush();
	  }
	};

	/**
	 * Flush write buffers.
	 *
	 * @api private
	 */

	Socket.prototype.flush = function () {
	  if ('closed' !== this.readyState && this.transport.writable &&
	    !this.upgrading && this.writeBuffer.length) {
	    debug$5('flushing %d packets in socket', this.writeBuffer.length);
	    this.transport.send(this.writeBuffer);
	    // keep track of current length of writeBuffer
	    // splice writeBuffer and callbackBuffer on `drain`
	    this.prevBufferLen = this.writeBuffer.length;
	    this.emit('flush');
	  }
	};

	/**
	 * Sends a message.
	 *
	 * @param {String} message.
	 * @param {Function} callback function.
	 * @param {Object} options.
	 * @return {Socket} for chaining.
	 * @api public
	 */

	Socket.prototype.write =
	Socket.prototype.send = function (msg, options, fn) {
	  this.sendPacket('message', msg, options, fn);
	  return this;
	};

	/**
	 * Sends a packet.
	 *
	 * @param {String} packet type.
	 * @param {String} data.
	 * @param {Object} options.
	 * @param {Function} callback function.
	 * @api private
	 */

	Socket.prototype.sendPacket = function (type, data, options, fn) {
	  if ('function' === typeof data) {
	    fn = data;
	    data = undefined;
	  }

	  if ('function' === typeof options) {
	    fn = options;
	    options = null;
	  }

	  if ('closing' === this.readyState || 'closed' === this.readyState) {
	    return;
	  }

	  options = options || {};
	  options.compress = false !== options.compress;

	  var packet = {
	    type: type,
	    data: data,
	    options: options
	  };
	  this.emit('packetCreate', packet);
	  this.writeBuffer.push(packet);
	  if (fn) this.once('flush', fn);
	  this.flush();
	};

	/**
	 * Closes the connection.
	 *
	 * @api private
	 */

	Socket.prototype.close = function () {
	  if ('opening' === this.readyState || 'open' === this.readyState) {
	    this.readyState = 'closing';

	    var self = this;

	    if (this.writeBuffer.length) {
	      this.once('drain', function () {
	        if (this.upgrading) {
	          waitForUpgrade();
	        } else {
	          close();
	        }
	      });
	    } else if (this.upgrading) {
	      waitForUpgrade();
	    } else {
	      close();
	    }
	  }

	  function close () {
	    self.onClose('forced close');
	    debug$5('socket closing - telling transport to close');
	    self.transport.close();
	  }

	  function cleanupAndClose () {
	    self.removeListener('upgrade', cleanupAndClose);
	    self.removeListener('upgradeError', cleanupAndClose);
	    close();
	  }

	  function waitForUpgrade () {
	    // wait for upgrade to finish since we can't send packets while pausing a transport
	    self.once('upgrade', cleanupAndClose);
	    self.once('upgradeError', cleanupAndClose);
	  }

	  return this;
	};

	/**
	 * Called upon transport error
	 *
	 * @api private
	 */

	Socket.prototype.onError = function (err) {
	  debug$5('socket error %j', err);
	  Socket.priorWebsocketSuccess = false;
	  this.emit('error', err);
	  this.onClose('transport error', err);
	};

	/**
	 * Called upon transport close.
	 *
	 * @api private
	 */

	Socket.prototype.onClose = function (reason, desc) {
	  if ('opening' === this.readyState || 'open' === this.readyState || 'closing' === this.readyState) {
	    debug$5('socket close with reason: "%s"', reason);
	    var self = this;

	    // clear timers
	    clearTimeout(this.pingIntervalTimer);
	    clearTimeout(this.pingTimeoutTimer);

	    // stop event from firing again for transport
	    this.transport.removeAllListeners('close');

	    // ensure transport won't stay open
	    this.transport.close();

	    // ignore further transport communication
	    this.transport.removeAllListeners();

	    // set ready state
	    this.readyState = 'closed';

	    // clear session id
	    this.id = null;

	    // emit close event
	    this.emit('close', reason, desc);

	    // clean buffers after, so users can still
	    // grab the buffers on `close` event
	    self.writeBuffer = [];
	    self.prevBufferLen = 0;
	  }
	};

	/**
	 * Filters upgrades, returning only those matching client transports.
	 *
	 * @param {Array} server upgrades
	 * @api private
	 *
	 */

	Socket.prototype.filterUpgrades = function (upgrades) {
	  var filteredUpgrades = [];
	  for (var i = 0, j = upgrades.length; i < j; i++) {
	    if (~indexof(this.transports, upgrades[i])) filteredUpgrades.push(upgrades[i]);
	  }
	  return filteredUpgrades;
	};

	var lib = socket;

	/**
	 * Exports parser
	 *
	 * @api public
	 *
	 */
	var parser = browser$1;
	lib.parser = parser;

	var toArray_1 = toArray;

	function toArray(list, index) {
	    var array = [];

	    index = index || 0;

	    for (var i = index || 0; i < list.length; i++) {
	        array[i - index] = list[i];
	    }

	    return array
	}

	/**
	 * Module exports.
	 */

	var on_1 = on;

	/**
	 * Helper for subscriptions.
	 *
	 * @param {Object|EventEmitter} obj with `Emitter` mixin or `EventEmitter`
	 * @param {String} event name
	 * @param {Function} callback
	 * @api public
	 */

	function on (obj, ev, fn) {
	  obj.on(ev, fn);
	  return {
	    destroy: function () {
	      obj.removeListener(ev, fn);
	    }
	  };
	}

	/**
	 * Slice reference.
	 */

	var slice = [].slice;

	/**
	 * Bind `obj` to `fn`.
	 *
	 * @param {Object} obj
	 * @param {Function|String} fn or string
	 * @return {Function}
	 * @api public
	 */

	var componentBind = function(obj, fn){
	  if ('string' == typeof fn) fn = obj[fn];
	  if ('function' != typeof fn) throw new Error('bind() requires a function');
	  var args = slice.call(arguments, 2);
	  return function(){
	    return fn.apply(obj, args.concat(slice.call(arguments)));
	  }
	};

	var socket$1 = createCommonjsModule(function (module, exports) {
	/**
	 * Module dependencies.
	 */






	var debug = browser('socket.io-client:socket');



	/**
	 * Module exports.
	 */

	module.exports = exports = Socket;

	/**
	 * Internal events (blacklisted).
	 * These events can't be emitted by the user.
	 *
	 * @api private
	 */

	var events = {
	  connect: 1,
	  connect_error: 1,
	  connect_timeout: 1,
	  connecting: 1,
	  disconnect: 1,
	  error: 1,
	  reconnect: 1,
	  reconnect_attempt: 1,
	  reconnect_failed: 1,
	  reconnect_error: 1,
	  reconnecting: 1,
	  ping: 1,
	  pong: 1
	};

	/**
	 * Shortcut to `Emitter#emit`.
	 */

	var emit = componentEmitter.prototype.emit;

	/**
	 * `Socket` constructor.
	 *
	 * @api public
	 */

	function Socket (io, nsp, opts) {
	  this.io = io;
	  this.nsp = nsp;
	  this.json = this; // compat
	  this.ids = 0;
	  this.acks = {};
	  this.receiveBuffer = [];
	  this.sendBuffer = [];
	  this.connected = false;
	  this.disconnected = true;
	  this.flags = {};
	  if (opts && opts.query) {
	    this.query = opts.query;
	  }
	  if (this.io.autoConnect) this.open();
	}

	/**
	 * Mix in `Emitter`.
	 */

	componentEmitter(Socket.prototype);

	/**
	 * Subscribe to open, close and packet events
	 *
	 * @api private
	 */

	Socket.prototype.subEvents = function () {
	  if (this.subs) return;

	  var io = this.io;
	  this.subs = [
	    on_1(io, 'open', componentBind(this, 'onopen')),
	    on_1(io, 'packet', componentBind(this, 'onpacket')),
	    on_1(io, 'close', componentBind(this, 'onclose'))
	  ];
	};

	/**
	 * "Opens" the socket.
	 *
	 * @api public
	 */

	Socket.prototype.open =
	Socket.prototype.connect = function () {
	  if (this.connected) return this;

	  this.subEvents();
	  this.io.open(); // ensure open
	  if ('open' === this.io.readyState) this.onopen();
	  this.emit('connecting');
	  return this;
	};

	/**
	 * Sends a `message` event.
	 *
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.send = function () {
	  var args = toArray_1(arguments);
	  args.unshift('message');
	  this.emit.apply(this, args);
	  return this;
	};

	/**
	 * Override `emit`.
	 * If the event is in `events`, it's emitted normally.
	 *
	 * @param {String} event name
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.emit = function (ev) {
	  if (events.hasOwnProperty(ev)) {
	    emit.apply(this, arguments);
	    return this;
	  }

	  var args = toArray_1(arguments);
	  var packet = {
	    type: (this.flags.binary !== undefined ? this.flags.binary : hasBinary2(args)) ? socket_ioParser.BINARY_EVENT : socket_ioParser.EVENT,
	    data: args
	  };

	  packet.options = {};
	  packet.options.compress = !this.flags || false !== this.flags.compress;

	  // event ack callback
	  if ('function' === typeof args[args.length - 1]) {
	    debug('emitting packet with ack id %d', this.ids);
	    this.acks[this.ids] = args.pop();
	    packet.id = this.ids++;
	  }

	  if (this.connected) {
	    this.packet(packet);
	  } else {
	    this.sendBuffer.push(packet);
	  }

	  this.flags = {};

	  return this;
	};

	/**
	 * Sends a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.packet = function (packet) {
	  packet.nsp = this.nsp;
	  this.io.packet(packet);
	};

	/**
	 * Called upon engine `open`.
	 *
	 * @api private
	 */

	Socket.prototype.onopen = function () {
	  debug('transport is open - connecting');

	  // write connect packet if necessary
	  if ('/' !== this.nsp) {
	    if (this.query) {
	      var query = typeof this.query === 'object' ? parseqs.encode(this.query) : this.query;
	      debug('sending connect packet with query %s', query);
	      this.packet({type: socket_ioParser.CONNECT, query: query});
	    } else {
	      this.packet({type: socket_ioParser.CONNECT});
	    }
	  }
	};

	/**
	 * Called upon engine `close`.
	 *
	 * @param {String} reason
	 * @api private
	 */

	Socket.prototype.onclose = function (reason) {
	  debug('close (%s)', reason);
	  this.connected = false;
	  this.disconnected = true;
	  delete this.id;
	  this.emit('disconnect', reason);
	};

	/**
	 * Called with socket packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onpacket = function (packet) {
	  var sameNamespace = packet.nsp === this.nsp;
	  var rootNamespaceError = packet.type === socket_ioParser.ERROR && packet.nsp === '/';

	  if (!sameNamespace && !rootNamespaceError) return;

	  switch (packet.type) {
	    case socket_ioParser.CONNECT:
	      this.onconnect();
	      break;

	    case socket_ioParser.EVENT:
	      this.onevent(packet);
	      break;

	    case socket_ioParser.BINARY_EVENT:
	      this.onevent(packet);
	      break;

	    case socket_ioParser.ACK:
	      this.onack(packet);
	      break;

	    case socket_ioParser.BINARY_ACK:
	      this.onack(packet);
	      break;

	    case socket_ioParser.DISCONNECT:
	      this.ondisconnect();
	      break;

	    case socket_ioParser.ERROR:
	      this.emit('error', packet.data);
	      break;
	  }
	};

	/**
	 * Called upon a server event.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onevent = function (packet) {
	  var args = packet.data || [];
	  debug('emitting event %j', args);

	  if (null != packet.id) {
	    debug('attaching ack callback to event');
	    args.push(this.ack(packet.id));
	  }

	  if (this.connected) {
	    emit.apply(this, args);
	  } else {
	    this.receiveBuffer.push(args);
	  }
	};

	/**
	 * Produces an ack callback to emit with an event.
	 *
	 * @api private
	 */

	Socket.prototype.ack = function (id) {
	  var self = this;
	  var sent = false;
	  return function () {
	    // prevent double callbacks
	    if (sent) return;
	    sent = true;
	    var args = toArray_1(arguments);
	    debug('sending ack %j', args);

	    self.packet({
	      type: hasBinary2(args) ? socket_ioParser.BINARY_ACK : socket_ioParser.ACK,
	      id: id,
	      data: args
	    });
	  };
	};

	/**
	 * Called upon a server acknowlegement.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Socket.prototype.onack = function (packet) {
	  var ack = this.acks[packet.id];
	  if ('function' === typeof ack) {
	    debug('calling ack %s with %j', packet.id, packet.data);
	    ack.apply(this, packet.data);
	    delete this.acks[packet.id];
	  } else {
	    debug('bad ack %s', packet.id);
	  }
	};

	/**
	 * Called upon server connect.
	 *
	 * @api private
	 */

	Socket.prototype.onconnect = function () {
	  this.connected = true;
	  this.disconnected = false;
	  this.emit('connect');
	  this.emitBuffered();
	};

	/**
	 * Emit buffered events (received and emitted).
	 *
	 * @api private
	 */

	Socket.prototype.emitBuffered = function () {
	  var i;
	  for (i = 0; i < this.receiveBuffer.length; i++) {
	    emit.apply(this, this.receiveBuffer[i]);
	  }
	  this.receiveBuffer = [];

	  for (i = 0; i < this.sendBuffer.length; i++) {
	    this.packet(this.sendBuffer[i]);
	  }
	  this.sendBuffer = [];
	};

	/**
	 * Called upon server disconnect.
	 *
	 * @api private
	 */

	Socket.prototype.ondisconnect = function () {
	  debug('server disconnect (%s)', this.nsp);
	  this.destroy();
	  this.onclose('io server disconnect');
	};

	/**
	 * Called upon forced client/server side disconnections,
	 * this method ensures the manager stops tracking us and
	 * that reconnections don't get triggered for this.
	 *
	 * @api private.
	 */

	Socket.prototype.destroy = function () {
	  if (this.subs) {
	    // clean subscriptions to avoid reconnections
	    for (var i = 0; i < this.subs.length; i++) {
	      this.subs[i].destroy();
	    }
	    this.subs = null;
	  }

	  this.io.destroy(this);
	};

	/**
	 * Disconnects the socket manually.
	 *
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.close =
	Socket.prototype.disconnect = function () {
	  if (this.connected) {
	    debug('performing disconnect (%s)', this.nsp);
	    this.packet({ type: socket_ioParser.DISCONNECT });
	  }

	  // remove socket from pool
	  this.destroy();

	  if (this.connected) {
	    // fire events
	    this.onclose('io client disconnect');
	  }
	  return this;
	};

	/**
	 * Sets the compress flag.
	 *
	 * @param {Boolean} if `true`, compresses the sending data
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.compress = function (compress) {
	  this.flags.compress = compress;
	  return this;
	};

	/**
	 * Sets the binary flag
	 *
	 * @param {Boolean} whether the emitted data contains binary
	 * @return {Socket} self
	 * @api public
	 */

	Socket.prototype.binary = function (binary) {
	  this.flags.binary = binary;
	  return this;
	};
	});

	/**
	 * Expose `Backoff`.
	 */

	var backo2 = Backoff;

	/**
	 * Initialize backoff timer with `opts`.
	 *
	 * - `min` initial timeout in milliseconds [100]
	 * - `max` max timeout [10000]
	 * - `jitter` [0]
	 * - `factor` [2]
	 *
	 * @param {Object} opts
	 * @api public
	 */

	function Backoff(opts) {
	  opts = opts || {};
	  this.ms = opts.min || 100;
	  this.max = opts.max || 10000;
	  this.factor = opts.factor || 2;
	  this.jitter = opts.jitter > 0 && opts.jitter <= 1 ? opts.jitter : 0;
	  this.attempts = 0;
	}

	/**
	 * Return the backoff duration.
	 *
	 * @return {Number}
	 * @api public
	 */

	Backoff.prototype.duration = function(){
	  var ms = this.ms * Math.pow(this.factor, this.attempts++);
	  if (this.jitter) {
	    var rand =  Math.random();
	    var deviation = Math.floor(rand * this.jitter * ms);
	    ms = (Math.floor(rand * 10) & 1) == 0  ? ms - deviation : ms + deviation;
	  }
	  return Math.min(ms, this.max) | 0;
	};

	/**
	 * Reset the number of attempts.
	 *
	 * @api public
	 */

	Backoff.prototype.reset = function(){
	  this.attempts = 0;
	};

	/**
	 * Set the minimum duration
	 *
	 * @api public
	 */

	Backoff.prototype.setMin = function(min){
	  this.ms = min;
	};

	/**
	 * Set the maximum duration
	 *
	 * @api public
	 */

	Backoff.prototype.setMax = function(max){
	  this.max = max;
	};

	/**
	 * Set the jitter
	 *
	 * @api public
	 */

	Backoff.prototype.setJitter = function(jitter){
	  this.jitter = jitter;
	};

	/**
	 * Module dependencies.
	 */







	var debug$6 = browser('socket.io-client:manager');



	/**
	 * IE6+ hasOwnProperty
	 */

	var has$2 = Object.prototype.hasOwnProperty;

	/**
	 * Module exports
	 */

	var manager = Manager;

	/**
	 * `Manager` constructor.
	 *
	 * @param {String} engine instance or engine uri/opts
	 * @param {Object} options
	 * @api public
	 */

	function Manager (uri, opts) {
	  if (!(this instanceof Manager)) return new Manager(uri, opts);
	  if (uri && ('object' === typeof uri)) {
	    opts = uri;
	    uri = undefined;
	  }
	  opts = opts || {};

	  opts.path = opts.path || '/socket.io';
	  this.nsps = {};
	  this.subs = [];
	  this.opts = opts;
	  this.reconnection(opts.reconnection !== false);
	  this.reconnectionAttempts(opts.reconnectionAttempts || Infinity);
	  this.reconnectionDelay(opts.reconnectionDelay || 1000);
	  this.reconnectionDelayMax(opts.reconnectionDelayMax || 5000);
	  this.randomizationFactor(opts.randomizationFactor || 0.5);
	  this.backoff = new backo2({
	    min: this.reconnectionDelay(),
	    max: this.reconnectionDelayMax(),
	    jitter: this.randomizationFactor()
	  });
	  this.timeout(null == opts.timeout ? 20000 : opts.timeout);
	  this.readyState = 'closed';
	  this.uri = uri;
	  this.connecting = [];
	  this.lastPing = null;
	  this.encoding = false;
	  this.packetBuffer = [];
	  var _parser = opts.parser || socket_ioParser;
	  this.encoder = new _parser.Encoder();
	  this.decoder = new _parser.Decoder();
	  this.autoConnect = opts.autoConnect !== false;
	  if (this.autoConnect) this.open();
	}

	/**
	 * Propagate given event to sockets and emit on `this`
	 *
	 * @api private
	 */

	Manager.prototype.emitAll = function () {
	  this.emit.apply(this, arguments);
	  for (var nsp in this.nsps) {
	    if (has$2.call(this.nsps, nsp)) {
	      this.nsps[nsp].emit.apply(this.nsps[nsp], arguments);
	    }
	  }
	};

	/**
	 * Update `socket.id` of all sockets
	 *
	 * @api private
	 */

	Manager.prototype.updateSocketIds = function () {
	  for (var nsp in this.nsps) {
	    if (has$2.call(this.nsps, nsp)) {
	      this.nsps[nsp].id = this.generateId(nsp);
	    }
	  }
	};

	/**
	 * generate `socket.id` for the given `nsp`
	 *
	 * @param {String} nsp
	 * @return {String}
	 * @api private
	 */

	Manager.prototype.generateId = function (nsp) {
	  return (nsp === '/' ? '' : (nsp + '#')) + this.engine.id;
	};

	/**
	 * Mix in `Emitter`.
	 */

	componentEmitter(Manager.prototype);

	/**
	 * Sets the `reconnection` config.
	 *
	 * @param {Boolean} true/false if it should automatically reconnect
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnection = function (v) {
	  if (!arguments.length) return this._reconnection;
	  this._reconnection = !!v;
	  return this;
	};

	/**
	 * Sets the reconnection attempts config.
	 *
	 * @param {Number} max reconnection attempts before giving up
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionAttempts = function (v) {
	  if (!arguments.length) return this._reconnectionAttempts;
	  this._reconnectionAttempts = v;
	  return this;
	};

	/**
	 * Sets the delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionDelay = function (v) {
	  if (!arguments.length) return this._reconnectionDelay;
	  this._reconnectionDelay = v;
	  this.backoff && this.backoff.setMin(v);
	  return this;
	};

	Manager.prototype.randomizationFactor = function (v) {
	  if (!arguments.length) return this._randomizationFactor;
	  this._randomizationFactor = v;
	  this.backoff && this.backoff.setJitter(v);
	  return this;
	};

	/**
	 * Sets the maximum delay between reconnections.
	 *
	 * @param {Number} delay
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.reconnectionDelayMax = function (v) {
	  if (!arguments.length) return this._reconnectionDelayMax;
	  this._reconnectionDelayMax = v;
	  this.backoff && this.backoff.setMax(v);
	  return this;
	};

	/**
	 * Sets the connection timeout. `false` to disable
	 *
	 * @return {Manager} self or value
	 * @api public
	 */

	Manager.prototype.timeout = function (v) {
	  if (!arguments.length) return this._timeout;
	  this._timeout = v;
	  return this;
	};

	/**
	 * Starts trying to reconnect if reconnection is enabled and we have not
	 * started reconnecting yet
	 *
	 * @api private
	 */

	Manager.prototype.maybeReconnectOnOpen = function () {
	  // Only try to reconnect if it's the first time we're connecting
	  if (!this.reconnecting && this._reconnection && this.backoff.attempts === 0) {
	    // keeps reconnection from firing twice for the same reconnection loop
	    this.reconnect();
	  }
	};

	/**
	 * Sets the current transport `socket`.
	 *
	 * @param {Function} optional, callback
	 * @return {Manager} self
	 * @api public
	 */

	Manager.prototype.open =
	Manager.prototype.connect = function (fn, opts) {
	  debug$6('readyState %s', this.readyState);
	  if (~this.readyState.indexOf('open')) return this;

	  debug$6('opening %s', this.uri);
	  this.engine = lib(this.uri, this.opts);
	  var socket = this.engine;
	  var self = this;
	  this.readyState = 'opening';
	  this.skipReconnect = false;

	  // emit `open`
	  var openSub = on_1(socket, 'open', function () {
	    self.onopen();
	    fn && fn();
	  });

	  // emit `connect_error`
	  var errorSub = on_1(socket, 'error', function (data) {
	    debug$6('connect_error');
	    self.cleanup();
	    self.readyState = 'closed';
	    self.emitAll('connect_error', data);
	    if (fn) {
	      var err = new Error('Connection error');
	      err.data = data;
	      fn(err);
	    } else {
	      // Only do this if there is no fn to handle the error
	      self.maybeReconnectOnOpen();
	    }
	  });

	  // emit `connect_timeout`
	  if (false !== this._timeout) {
	    var timeout = this._timeout;
	    debug$6('connect attempt will timeout after %d', timeout);

	    // set timer
	    var timer = setTimeout(function () {
	      debug$6('connect attempt timed out after %d', timeout);
	      openSub.destroy();
	      socket.close();
	      socket.emit('error', 'timeout');
	      self.emitAll('connect_timeout', timeout);
	    }, timeout);

	    this.subs.push({
	      destroy: function () {
	        clearTimeout(timer);
	      }
	    });
	  }

	  this.subs.push(openSub);
	  this.subs.push(errorSub);

	  return this;
	};

	/**
	 * Called upon transport open.
	 *
	 * @api private
	 */

	Manager.prototype.onopen = function () {
	  debug$6('open');

	  // clear old subs
	  this.cleanup();

	  // mark as open
	  this.readyState = 'open';
	  this.emit('open');

	  // add new subs
	  var socket = this.engine;
	  this.subs.push(on_1(socket, 'data', componentBind(this, 'ondata')));
	  this.subs.push(on_1(socket, 'ping', componentBind(this, 'onping')));
	  this.subs.push(on_1(socket, 'pong', componentBind(this, 'onpong')));
	  this.subs.push(on_1(socket, 'error', componentBind(this, 'onerror')));
	  this.subs.push(on_1(socket, 'close', componentBind(this, 'onclose')));
	  this.subs.push(on_1(this.decoder, 'decoded', componentBind(this, 'ondecoded')));
	};

	/**
	 * Called upon a ping.
	 *
	 * @api private
	 */

	Manager.prototype.onping = function () {
	  this.lastPing = new Date();
	  this.emitAll('ping');
	};

	/**
	 * Called upon a packet.
	 *
	 * @api private
	 */

	Manager.prototype.onpong = function () {
	  this.emitAll('pong', new Date() - this.lastPing);
	};

	/**
	 * Called with data.
	 *
	 * @api private
	 */

	Manager.prototype.ondata = function (data) {
	  this.decoder.add(data);
	};

	/**
	 * Called when parser fully decodes a packet.
	 *
	 * @api private
	 */

	Manager.prototype.ondecoded = function (packet) {
	  this.emit('packet', packet);
	};

	/**
	 * Called upon socket error.
	 *
	 * @api private
	 */

	Manager.prototype.onerror = function (err) {
	  debug$6('error', err);
	  this.emitAll('error', err);
	};

	/**
	 * Creates a new socket for the given `nsp`.
	 *
	 * @return {Socket}
	 * @api public
	 */

	Manager.prototype.socket = function (nsp, opts) {
	  var socket = this.nsps[nsp];
	  if (!socket) {
	    socket = new socket$1(this, nsp, opts);
	    this.nsps[nsp] = socket;
	    var self = this;
	    socket.on('connecting', onConnecting);
	    socket.on('connect', function () {
	      socket.id = self.generateId(nsp);
	    });

	    if (this.autoConnect) {
	      // manually call here since connecting event is fired before listening
	      onConnecting();
	    }
	  }

	  function onConnecting () {
	    if (!~indexof(self.connecting, socket)) {
	      self.connecting.push(socket);
	    }
	  }

	  return socket;
	};

	/**
	 * Called upon a socket close.
	 *
	 * @param {Socket} socket
	 */

	Manager.prototype.destroy = function (socket) {
	  var index = indexof(this.connecting, socket);
	  if (~index) this.connecting.splice(index, 1);
	  if (this.connecting.length) return;

	  this.close();
	};

	/**
	 * Writes a packet.
	 *
	 * @param {Object} packet
	 * @api private
	 */

	Manager.prototype.packet = function (packet) {
	  debug$6('writing packet %j', packet);
	  var self = this;
	  if (packet.query && packet.type === 0) packet.nsp += '?' + packet.query;

	  if (!self.encoding) {
	    // encode, then write to engine with result
	    self.encoding = true;
	    this.encoder.encode(packet, function (encodedPackets) {
	      for (var i = 0; i < encodedPackets.length; i++) {
	        self.engine.write(encodedPackets[i], packet.options);
	      }
	      self.encoding = false;
	      self.processPacketQueue();
	    });
	  } else { // add packet to the queue
	    self.packetBuffer.push(packet);
	  }
	};

	/**
	 * If packet buffer is non-empty, begins encoding the
	 * next packet in line.
	 *
	 * @api private
	 */

	Manager.prototype.processPacketQueue = function () {
	  if (this.packetBuffer.length > 0 && !this.encoding) {
	    var pack = this.packetBuffer.shift();
	    this.packet(pack);
	  }
	};

	/**
	 * Clean up transport subscriptions and packet buffer.
	 *
	 * @api private
	 */

	Manager.prototype.cleanup = function () {
	  debug$6('cleanup');

	  var subsLength = this.subs.length;
	  for (var i = 0; i < subsLength; i++) {
	    var sub = this.subs.shift();
	    sub.destroy();
	  }

	  this.packetBuffer = [];
	  this.encoding = false;
	  this.lastPing = null;

	  this.decoder.destroy();
	};

	/**
	 * Close the current socket.
	 *
	 * @api private
	 */

	Manager.prototype.close =
	Manager.prototype.disconnect = function () {
	  debug$6('disconnect');
	  this.skipReconnect = true;
	  this.reconnecting = false;
	  if ('opening' === this.readyState) {
	    // `onclose` will not fire because
	    // an open event never happened
	    this.cleanup();
	  }
	  this.backoff.reset();
	  this.readyState = 'closed';
	  if (this.engine) this.engine.close();
	};

	/**
	 * Called upon engine close.
	 *
	 * @api private
	 */

	Manager.prototype.onclose = function (reason) {
	  debug$6('onclose');

	  this.cleanup();
	  this.backoff.reset();
	  this.readyState = 'closed';
	  this.emit('close', reason);

	  if (this._reconnection && !this.skipReconnect) {
	    this.reconnect();
	  }
	};

	/**
	 * Attempt a reconnection.
	 *
	 * @api private
	 */

	Manager.prototype.reconnect = function () {
	  if (this.reconnecting || this.skipReconnect) return this;

	  var self = this;

	  if (this.backoff.attempts >= this._reconnectionAttempts) {
	    debug$6('reconnect failed');
	    this.backoff.reset();
	    this.emitAll('reconnect_failed');
	    this.reconnecting = false;
	  } else {
	    var delay = this.backoff.duration();
	    debug$6('will wait %dms before reconnect attempt', delay);

	    this.reconnecting = true;
	    var timer = setTimeout(function () {
	      if (self.skipReconnect) return;

	      debug$6('attempting reconnect');
	      self.emitAll('reconnect_attempt', self.backoff.attempts);
	      self.emitAll('reconnecting', self.backoff.attempts);

	      // check again for the case socket closed in above events
	      if (self.skipReconnect) return;

	      self.open(function (err) {
	        if (err) {
	          debug$6('reconnect attempt error');
	          self.reconnecting = false;
	          self.reconnect();
	          self.emitAll('reconnect_error', err.data);
	        } else {
	          debug$6('reconnect success');
	          self.onreconnect();
	        }
	      });
	    }, delay);

	    this.subs.push({
	      destroy: function () {
	        clearTimeout(timer);
	      }
	    });
	  }
	};

	/**
	 * Called upon successful reconnect.
	 *
	 * @api private
	 */

	Manager.prototype.onreconnect = function () {
	  var attempt = this.backoff.attempts;
	  this.reconnecting = false;
	  this.backoff.reset();
	  this.updateSocketIds();
	  this.emitAll('reconnect', attempt);
	};

	var lib$1 = createCommonjsModule(function (module, exports) {
	/**
	 * Module dependencies.
	 */




	var debug = browser('socket.io-client');

	/**
	 * Module exports.
	 */

	module.exports = exports = lookup;

	/**
	 * Managers cache.
	 */

	var cache = exports.managers = {};

	/**
	 * Looks up an existing `Manager` for multiplexing.
	 * If the user summons:
	 *
	 *   `io('http://localhost/a');`
	 *   `io('http://localhost/b');`
	 *
	 * We reuse the existing instance based on same scheme/port/host,
	 * and we initialize sockets for each namespace.
	 *
	 * @api public
	 */

	function lookup (uri, opts) {
	  if (typeof uri === 'object') {
	    opts = uri;
	    uri = undefined;
	  }

	  opts = opts || {};

	  var parsed = url_1(uri);
	  var source = parsed.source;
	  var id = parsed.id;
	  var path = parsed.path;
	  var sameNamespace = cache[id] && path in cache[id].nsps;
	  var newConnection = opts.forceNew || opts['force new connection'] ||
	                      false === opts.multiplex || sameNamespace;

	  var io;

	  if (newConnection) {
	    debug('ignoring socket cache for %s', source);
	    io = manager(source, opts);
	  } else {
	    if (!cache[id]) {
	      debug('new io instance for %s', source);
	      cache[id] = manager(source, opts);
	    }
	    io = cache[id];
	  }
	  if (parsed.query && !opts.query) {
	    opts.query = parsed.query;
	  }
	  return io.socket(parsed.path, opts);
	}

	/**
	 * Protocol version.
	 *
	 * @api public
	 */

	exports.protocol = socket_ioParser.protocol;

	/**
	 * `connect`.
	 *
	 * @param {String} uri
	 * @api public
	 */

	exports.connect = lookup;

	/**
	 * Expose constructors for standalone build.
	 *
	 * @api public
	 */

	exports.Manager = manager;
	exports.Socket = socket$1;
	});
	var lib_1 = lib$1.managers;
	var lib_2 = lib$1.protocol;
	var lib_3 = lib$1.connect;
	var lib_4 = lib$1.Manager;
	var lib_5 = lib$1.Socket;

	var nativeAssign = Object.assign;
	var defineProperty$7 = Object.defineProperty;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	var objectAssign = !nativeAssign || fails(function () {
	  // should have correct order of operations (Edge bug)
	  if (descriptors && nativeAssign({ b: 1 }, nativeAssign(defineProperty$7({}, 'a', {
	    enumerable: true,
	    get: function () {
	      defineProperty$7(this, 'b', {
	        value: 3,
	        enumerable: false
	      });
	    }
	  }), { b: 2 })).b !== 1) return true;
	  // should work with symbols and should have deterministic property order (V8 bug)
	  var A = {};
	  var B = {};
	  // eslint-disable-next-line no-undef
	  var symbol = Symbol();
	  var alphabet = 'abcdefghijklmnopqrst';
	  A[symbol] = 7;
	  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
	  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
	}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
	  var T = toObject(target);
	  var argumentsLength = arguments.length;
	  var index = 1;
	  var getOwnPropertySymbols = objectGetOwnPropertySymbols.f;
	  var propertyIsEnumerable = objectPropertyIsEnumerable.f;
	  while (argumentsLength > index) {
	    var S = indexedObject(arguments[index++]);
	    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
	    var length = keys.length;
	    var j = 0;
	    var key;
	    while (length > j) {
	      key = keys[j++];
	      if (!descriptors || propertyIsEnumerable.call(S, key)) T[key] = S[key];
	    }
	  } return T;
	} : nativeAssign;

	// `Object.assign` method
	// https://tc39.github.io/ecma262/#sec-object.assign
	_export({ target: 'Object', stat: true, forced: Object.assign !== objectAssign }, {
	  assign: objectAssign
	});

	var bind$1 = function bind(fn, thisArg) {
	  return function wrap() {
	    var args = new Array(arguments.length);
	    for (var i = 0; i < args.length; i++) {
	      args[i] = arguments[i];
	    }
	    return fn.apply(thisArg, args);
	  };
	};

	/*!
	 * Determine if an object is a Buffer
	 *
	 * @author   Feross Aboukhadijeh <https://feross.org>
	 * @license  MIT
	 */

	// The _isBuffer check is for Safari 5-7 support, because it's missing
	// Object.prototype.constructor. Remove this eventually
	var isBuffer_1 = function (obj) {
	  return obj != null && (isBuffer$1(obj) || isSlowBuffer(obj) || !!obj._isBuffer)
	};

	function isBuffer$1 (obj) {
	  return !!obj.constructor && typeof obj.constructor.isBuffer === 'function' && obj.constructor.isBuffer(obj)
	}

	// For Node v0.10 support. Remove this eventually.
	function isSlowBuffer (obj) {
	  return typeof obj.readFloatLE === 'function' && typeof obj.slice === 'function' && isBuffer$1(obj.slice(0, 0))
	}

	/*global toString:true*/

	// utils is a library of generic helper functions non-specific to axios

	var toString$5 = Object.prototype.toString;

	/**
	 * Determine if a value is an Array
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Array, otherwise false
	 */
	function isArray$1(val) {
	  return toString$5.call(val) === '[object Array]';
	}

	/**
	 * Determine if a value is an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
	 */
	function isArrayBuffer(val) {
	  return toString$5.call(val) === '[object ArrayBuffer]';
	}

	/**
	 * Determine if a value is a FormData
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an FormData, otherwise false
	 */
	function isFormData(val) {
	  return (typeof FormData !== 'undefined') && (val instanceof FormData);
	}

	/**
	 * Determine if a value is a view on an ArrayBuffer
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
	 */
	function isArrayBufferView(val) {
	  var result;
	  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
	    result = ArrayBuffer.isView(val);
	  } else {
	    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
	  }
	  return result;
	}

	/**
	 * Determine if a value is a String
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a String, otherwise false
	 */
	function isString(val) {
	  return typeof val === 'string';
	}

	/**
	 * Determine if a value is a Number
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Number, otherwise false
	 */
	function isNumber(val) {
	  return typeof val === 'number';
	}

	/**
	 * Determine if a value is undefined
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if the value is undefined, otherwise false
	 */
	function isUndefined(val) {
	  return typeof val === 'undefined';
	}

	/**
	 * Determine if a value is an Object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is an Object, otherwise false
	 */
	function isObject$1(val) {
	  return val !== null && typeof val === 'object';
	}

	/**
	 * Determine if a value is a Date
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Date, otherwise false
	 */
	function isDate(val) {
	  return toString$5.call(val) === '[object Date]';
	}

	/**
	 * Determine if a value is a File
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a File, otherwise false
	 */
	function isFile(val) {
	  return toString$5.call(val) === '[object File]';
	}

	/**
	 * Determine if a value is a Blob
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Blob, otherwise false
	 */
	function isBlob(val) {
	  return toString$5.call(val) === '[object Blob]';
	}

	/**
	 * Determine if a value is a Function
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Function, otherwise false
	 */
	function isFunction(val) {
	  return toString$5.call(val) === '[object Function]';
	}

	/**
	 * Determine if a value is a Stream
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a Stream, otherwise false
	 */
	function isStream(val) {
	  return isObject$1(val) && isFunction(val.pipe);
	}

	/**
	 * Determine if a value is a URLSearchParams object
	 *
	 * @param {Object} val The value to test
	 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
	 */
	function isURLSearchParams(val) {
	  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
	}

	/**
	 * Trim excess whitespace off the beginning and end of a string
	 *
	 * @param {String} str The String to trim
	 * @returns {String} The String freed of excess whitespace
	 */
	function trim$1(str) {
	  return str.replace(/^\s*/, '').replace(/\s*$/, '');
	}

	/**
	 * Determine if we're running in a standard browser environment
	 *
	 * This allows axios to run in a web worker, and react-native.
	 * Both environments support XMLHttpRequest, but not fully standard globals.
	 *
	 * web workers:
	 *  typeof window -> undefined
	 *  typeof document -> undefined
	 *
	 * react-native:
	 *  navigator.product -> 'ReactNative'
	 */
	function isStandardBrowserEnv() {
	  if (typeof navigator !== 'undefined' && navigator.product === 'ReactNative') {
	    return false;
	  }
	  return (
	    typeof window !== 'undefined' &&
	    typeof document !== 'undefined'
	  );
	}

	/**
	 * Iterate over an Array or an Object invoking a function for each item.
	 *
	 * If `obj` is an Array callback will be called passing
	 * the value, index, and complete array for each item.
	 *
	 * If 'obj' is an Object callback will be called passing
	 * the value, key, and complete object for each property.
	 *
	 * @param {Object|Array} obj The object to iterate
	 * @param {Function} fn The callback to invoke for each item
	 */
	function forEach(obj, fn) {
	  // Don't bother if no value provided
	  if (obj === null || typeof obj === 'undefined') {
	    return;
	  }

	  // Force an array if not already something iterable
	  if (typeof obj !== 'object') {
	    /*eslint no-param-reassign:0*/
	    obj = [obj];
	  }

	  if (isArray$1(obj)) {
	    // Iterate over array values
	    for (var i = 0, l = obj.length; i < l; i++) {
	      fn.call(null, obj[i], i, obj);
	    }
	  } else {
	    // Iterate over object keys
	    for (var key in obj) {
	      if (Object.prototype.hasOwnProperty.call(obj, key)) {
	        fn.call(null, obj[key], key, obj);
	      }
	    }
	  }
	}

	/**
	 * Accepts varargs expecting each argument to be an object, then
	 * immutably merges the properties of each object and returns result.
	 *
	 * When multiple objects contain the same key the later object in
	 * the arguments list will take precedence.
	 *
	 * Example:
	 *
	 * ```js
	 * var result = merge({foo: 123}, {foo: 456});
	 * console.log(result.foo); // outputs 456
	 * ```
	 *
	 * @param {Object} obj1 Object to merge
	 * @returns {Object} Result of all merge properties
	 */
	function merge(/* obj1, obj2, obj3, ... */) {
	  var result = {};
	  function assignValue(val, key) {
	    if (typeof result[key] === 'object' && typeof val === 'object') {
	      result[key] = merge(result[key], val);
	    } else {
	      result[key] = val;
	    }
	  }

	  for (var i = 0, l = arguments.length; i < l; i++) {
	    forEach(arguments[i], assignValue);
	  }
	  return result;
	}

	/**
	 * Extends object a by mutably adding to it the properties of object b.
	 *
	 * @param {Object} a The object to be extended
	 * @param {Object} b The object to copy properties from
	 * @param {Object} thisArg The object to bind function to
	 * @return {Object} The resulting value of object a
	 */
	function extend(a, b, thisArg) {
	  forEach(b, function assignValue(val, key) {
	    if (thisArg && typeof val === 'function') {
	      a[key] = bind$1(val, thisArg);
	    } else {
	      a[key] = val;
	    }
	  });
	  return a;
	}

	var utils = {
	  isArray: isArray$1,
	  isArrayBuffer: isArrayBuffer,
	  isBuffer: isBuffer_1,
	  isFormData: isFormData,
	  isArrayBufferView: isArrayBufferView,
	  isString: isString,
	  isNumber: isNumber,
	  isObject: isObject$1,
	  isUndefined: isUndefined,
	  isDate: isDate,
	  isFile: isFile,
	  isBlob: isBlob,
	  isFunction: isFunction,
	  isStream: isStream,
	  isURLSearchParams: isURLSearchParams,
	  isStandardBrowserEnv: isStandardBrowserEnv,
	  forEach: forEach,
	  merge: merge,
	  extend: extend,
	  trim: trim$1
	};

	var normalizeHeaderName = function normalizeHeaderName(headers, normalizedName) {
	  utils.forEach(headers, function processHeader(value, name) {
	    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
	      headers[normalizedName] = value;
	      delete headers[name];
	    }
	  });
	};

	/**
	 * Update an Error with the specified config, error code, and response.
	 *
	 * @param {Error} error The error to update.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The error.
	 */
	var enhanceError = function enhanceError(error, config, code, request, response) {
	  error.config = config;
	  if (code) {
	    error.code = code;
	  }
	  error.request = request;
	  error.response = response;
	  return error;
	};

	/**
	 * Create an Error with the specified message, config, error code, request and response.
	 *
	 * @param {string} message The error message.
	 * @param {Object} config The config.
	 * @param {string} [code] The error code (for example, 'ECONNABORTED').
	 * @param {Object} [request] The request.
	 * @param {Object} [response] The response.
	 * @returns {Error} The created error.
	 */
	var createError = function createError(message, config, code, request, response) {
	  var error = new Error(message);
	  return enhanceError(error, config, code, request, response);
	};

	/**
	 * Resolve or reject a Promise based on response status.
	 *
	 * @param {Function} resolve A function that resolves the promise.
	 * @param {Function} reject A function that rejects the promise.
	 * @param {object} response The response.
	 */
	var settle = function settle(resolve, reject, response) {
	  var validateStatus = response.config.validateStatus;
	  // Note: status is not exposed by XDomainRequest
	  if (!response.status || !validateStatus || validateStatus(response.status)) {
	    resolve(response);
	  } else {
	    reject(createError(
	      'Request failed with status code ' + response.status,
	      response.config,
	      null,
	      response.request,
	      response
	    ));
	  }
	};

	function encode$2(val) {
	  return encodeURIComponent(val).
	    replace(/%40/gi, '@').
	    replace(/%3A/gi, ':').
	    replace(/%24/g, '$').
	    replace(/%2C/gi, ',').
	    replace(/%20/g, '+').
	    replace(/%5B/gi, '[').
	    replace(/%5D/gi, ']');
	}

	/**
	 * Build a URL by appending params to the end
	 *
	 * @param {string} url The base of the url (e.g., http://www.google.com)
	 * @param {object} [params] The params to be appended
	 * @returns {string} The formatted url
	 */
	var buildURL = function buildURL(url, params, paramsSerializer) {
	  /*eslint no-param-reassign:0*/
	  if (!params) {
	    return url;
	  }

	  var serializedParams;
	  if (paramsSerializer) {
	    serializedParams = paramsSerializer(params);
	  } else if (utils.isURLSearchParams(params)) {
	    serializedParams = params.toString();
	  } else {
	    var parts = [];

	    utils.forEach(params, function serialize(val, key) {
	      if (val === null || typeof val === 'undefined') {
	        return;
	      }

	      if (utils.isArray(val)) {
	        key = key + '[]';
	      } else {
	        val = [val];
	      }

	      utils.forEach(val, function parseValue(v) {
	        if (utils.isDate(v)) {
	          v = v.toISOString();
	        } else if (utils.isObject(v)) {
	          v = JSON.stringify(v);
	        }
	        parts.push(encode$2(key) + '=' + encode$2(v));
	      });
	    });

	    serializedParams = parts.join('&');
	  }

	  if (serializedParams) {
	    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
	  }

	  return url;
	};

	// Headers whose duplicates are ignored by node
	// c.f. https://nodejs.org/api/http.html#http_message_headers
	var ignoreDuplicateOf = [
	  'age', 'authorization', 'content-length', 'content-type', 'etag',
	  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
	  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
	  'referer', 'retry-after', 'user-agent'
	];

	/**
	 * Parse headers into an object
	 *
	 * ```
	 * Date: Wed, 27 Aug 2014 08:58:49 GMT
	 * Content-Type: application/json
	 * Connection: keep-alive
	 * Transfer-Encoding: chunked
	 * ```
	 *
	 * @param {String} headers Headers needing to be parsed
	 * @returns {Object} Headers parsed into an object
	 */
	var parseHeaders = function parseHeaders(headers) {
	  var parsed = {};
	  var key;
	  var val;
	  var i;

	  if (!headers) { return parsed; }

	  utils.forEach(headers.split('\n'), function parser(line) {
	    i = line.indexOf(':');
	    key = utils.trim(line.substr(0, i)).toLowerCase();
	    val = utils.trim(line.substr(i + 1));

	    if (key) {
	      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
	        return;
	      }
	      if (key === 'set-cookie') {
	        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
	      } else {
	        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
	      }
	    }
	  });

	  return parsed;
	};

	var isURLSameOrigin = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs have full support of the APIs needed to test
	  // whether the request URL is of the same origin as current location.
	  (function standardBrowserEnv() {
	    var msie = /(msie|trident)/i.test(navigator.userAgent);
	    var urlParsingNode = document.createElement('a');
	    var originURL;

	    /**
	    * Parse a URL to discover it's components
	    *
	    * @param {String} url The URL to be parsed
	    * @returns {Object}
	    */
	    function resolveURL(url) {
	      var href = url;

	      if (msie) {
	        // IE needs attribute set twice to normalize properties
	        urlParsingNode.setAttribute('href', href);
	        href = urlParsingNode.href;
	      }

	      urlParsingNode.setAttribute('href', href);

	      // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
	      return {
	        href: urlParsingNode.href,
	        protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
	        host: urlParsingNode.host,
	        search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
	        hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
	        hostname: urlParsingNode.hostname,
	        port: urlParsingNode.port,
	        pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
	                  urlParsingNode.pathname :
	                  '/' + urlParsingNode.pathname
	      };
	    }

	    originURL = resolveURL(window.location.href);

	    /**
	    * Determine if a URL shares the same origin as the current location
	    *
	    * @param {String} requestURL The URL to test
	    * @returns {boolean} True if URL shares the same origin, otherwise false
	    */
	    return function isURLSameOrigin(requestURL) {
	      var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
	      return (parsed.protocol === originURL.protocol &&
	            parsed.host === originURL.host);
	    };
	  })() :

	  // Non standard browser envs (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return function isURLSameOrigin() {
	      return true;
	    };
	  })()
	);

	// btoa polyfill for IE<10 courtesy https://github.com/davidchambers/Base64.js

	var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';

	function E() {
	  this.message = 'String contains an invalid character';
	}
	E.prototype = new Error;
	E.prototype.code = 5;
	E.prototype.name = 'InvalidCharacterError';

	function btoa(input) {
	  var str = String(input);
	  var output = '';
	  for (
	    // initialize result and counter
	    var block, charCode, idx = 0, map = chars;
	    // if the next str index does not exist:
	    //   change the mapping table to "="
	    //   check if d has no fractional digits
	    str.charAt(idx | 0) || (map = '=', idx % 1);
	    // "8 - idx % 1 * 8" generates the sequence 2, 4, 6, 8
	    output += map.charAt(63 & block >> 8 - idx % 1 * 8)
	  ) {
	    charCode = str.charCodeAt(idx += 3 / 4);
	    if (charCode > 0xFF) {
	      throw new E();
	    }
	    block = block << 8 | charCode;
	  }
	  return output;
	}

	var btoa_1 = btoa;

	var cookies = (
	  utils.isStandardBrowserEnv() ?

	  // Standard browser envs support document.cookie
	  (function standardBrowserEnv() {
	    return {
	      write: function write(name, value, expires, path, domain, secure) {
	        var cookie = [];
	        cookie.push(name + '=' + encodeURIComponent(value));

	        if (utils.isNumber(expires)) {
	          cookie.push('expires=' + new Date(expires).toGMTString());
	        }

	        if (utils.isString(path)) {
	          cookie.push('path=' + path);
	        }

	        if (utils.isString(domain)) {
	          cookie.push('domain=' + domain);
	        }

	        if (secure === true) {
	          cookie.push('secure');
	        }

	        document.cookie = cookie.join('; ');
	      },

	      read: function read(name) {
	        var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
	        return (match ? decodeURIComponent(match[3]) : null);
	      },

	      remove: function remove(name) {
	        this.write(name, '', Date.now() - 86400000);
	      }
	    };
	  })() :

	  // Non standard browser env (web workers, react-native) lack needed support.
	  (function nonStandardBrowserEnv() {
	    return {
	      write: function write() {},
	      read: function read() { return null; },
	      remove: function remove() {}
	    };
	  })()
	);

	var btoa$1 = (typeof window !== 'undefined' && window.btoa && window.btoa.bind(window)) || btoa_1;

	var xhr = function xhrAdapter(config) {
	  return new Promise(function dispatchXhrRequest(resolve, reject) {
	    var requestData = config.data;
	    var requestHeaders = config.headers;

	    if (utils.isFormData(requestData)) {
	      delete requestHeaders['Content-Type']; // Let the browser set it
	    }

	    var request = new XMLHttpRequest();
	    var loadEvent = 'onreadystatechange';
	    var xDomain = false;

	    // For IE 8/9 CORS support
	    // Only supports POST and GET calls and doesn't returns the response headers.
	    // DON'T do this for testing b/c XMLHttpRequest is mocked, not XDomainRequest.
	    if (process.env.NODE_ENV !== 'test' &&
	        typeof window !== 'undefined' &&
	        window.XDomainRequest && !('withCredentials' in request) &&
	        !isURLSameOrigin(config.url)) {
	      request = new window.XDomainRequest();
	      loadEvent = 'onload';
	      xDomain = true;
	      request.onprogress = function handleProgress() {};
	      request.ontimeout = function handleTimeout() {};
	    }

	    // HTTP basic authentication
	    if (config.auth) {
	      var username = config.auth.username || '';
	      var password = config.auth.password || '';
	      requestHeaders.Authorization = 'Basic ' + btoa$1(username + ':' + password);
	    }

	    request.open(config.method.toUpperCase(), buildURL(config.url, config.params, config.paramsSerializer), true);

	    // Set the request timeout in MS
	    request.timeout = config.timeout;

	    // Listen for ready state
	    request[loadEvent] = function handleLoad() {
	      if (!request || (request.readyState !== 4 && !xDomain)) {
	        return;
	      }

	      // The request errored out and we didn't get a response, this will be
	      // handled by onerror instead
	      // With one exception: request that using file: protocol, most browsers
	      // will return status as 0 even though it's a successful request
	      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
	        return;
	      }

	      // Prepare the response
	      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
	      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
	      var response = {
	        data: responseData,
	        // IE sends 1223 instead of 204 (https://github.com/axios/axios/issues/201)
	        status: request.status === 1223 ? 204 : request.status,
	        statusText: request.status === 1223 ? 'No Content' : request.statusText,
	        headers: responseHeaders,
	        config: config,
	        request: request
	      };

	      settle(resolve, reject, response);

	      // Clean up request
	      request = null;
	    };

	    // Handle low level network errors
	    request.onerror = function handleError() {
	      // Real errors are hidden from us by the browser
	      // onerror should only fire if it's a network error
	      reject(createError('Network Error', config, null, request));

	      // Clean up request
	      request = null;
	    };

	    // Handle timeout
	    request.ontimeout = function handleTimeout() {
	      reject(createError('timeout of ' + config.timeout + 'ms exceeded', config, 'ECONNABORTED',
	        request));

	      // Clean up request
	      request = null;
	    };

	    // Add xsrf header
	    // This is only done if running in a standard browser environment.
	    // Specifically not if we're in a web worker, or react-native.
	    if (utils.isStandardBrowserEnv()) {
	      var cookies$1 = cookies;

	      // Add xsrf header
	      var xsrfValue = (config.withCredentials || isURLSameOrigin(config.url)) && config.xsrfCookieName ?
	          cookies$1.read(config.xsrfCookieName) :
	          undefined;

	      if (xsrfValue) {
	        requestHeaders[config.xsrfHeaderName] = xsrfValue;
	      }
	    }

	    // Add headers to the request
	    if ('setRequestHeader' in request) {
	      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
	        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
	          // Remove Content-Type if data is undefined
	          delete requestHeaders[key];
	        } else {
	          // Otherwise add header to the request
	          request.setRequestHeader(key, val);
	        }
	      });
	    }

	    // Add withCredentials to request if needed
	    if (config.withCredentials) {
	      request.withCredentials = true;
	    }

	    // Add responseType to request if needed
	    if (config.responseType) {
	      try {
	        request.responseType = config.responseType;
	      } catch (e) {
	        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
	        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
	        if (config.responseType !== 'json') {
	          throw e;
	        }
	      }
	    }

	    // Handle progress if needed
	    if (typeof config.onDownloadProgress === 'function') {
	      request.addEventListener('progress', config.onDownloadProgress);
	    }

	    // Not all browsers support upload events
	    if (typeof config.onUploadProgress === 'function' && request.upload) {
	      request.upload.addEventListener('progress', config.onUploadProgress);
	    }

	    if (config.cancelToken) {
	      // Handle cancellation
	      config.cancelToken.promise.then(function onCanceled(cancel) {
	        if (!request) {
	          return;
	        }

	        request.abort();
	        reject(cancel);
	        // Clean up request
	        request = null;
	      });
	    }

	    if (requestData === undefined) {
	      requestData = null;
	    }

	    // Send the request
	    request.send(requestData);
	  });
	};

	var DEFAULT_CONTENT_TYPE = {
	  'Content-Type': 'application/x-www-form-urlencoded'
	};

	function setContentTypeIfUnset(headers, value) {
	  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
	    headers['Content-Type'] = value;
	  }
	}

	function getDefaultAdapter() {
	  var adapter;
	  if (typeof XMLHttpRequest !== 'undefined') {
	    // For browsers use XHR adapter
	    adapter = xhr;
	  } else if (typeof process !== 'undefined') {
	    // For node use HTTP adapter
	    adapter = xhr;
	  }
	  return adapter;
	}

	var defaults = {
	  adapter: getDefaultAdapter(),

	  transformRequest: [function transformRequest(data, headers) {
	    normalizeHeaderName(headers, 'Content-Type');
	    if (utils.isFormData(data) ||
	      utils.isArrayBuffer(data) ||
	      utils.isBuffer(data) ||
	      utils.isStream(data) ||
	      utils.isFile(data) ||
	      utils.isBlob(data)
	    ) {
	      return data;
	    }
	    if (utils.isArrayBufferView(data)) {
	      return data.buffer;
	    }
	    if (utils.isURLSearchParams(data)) {
	      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
	      return data.toString();
	    }
	    if (utils.isObject(data)) {
	      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
	      return JSON.stringify(data);
	    }
	    return data;
	  }],

	  transformResponse: [function transformResponse(data) {
	    /*eslint no-param-reassign:0*/
	    if (typeof data === 'string') {
	      try {
	        data = JSON.parse(data);
	      } catch (e) { /* Ignore */ }
	    }
	    return data;
	  }],

	  /**
	   * A timeout in milliseconds to abort a request. If set to 0 (default) a
	   * timeout is not created.
	   */
	  timeout: 0,

	  xsrfCookieName: 'XSRF-TOKEN',
	  xsrfHeaderName: 'X-XSRF-TOKEN',

	  maxContentLength: -1,

	  validateStatus: function validateStatus(status) {
	    return status >= 200 && status < 300;
	  }
	};

	defaults.headers = {
	  common: {
	    'Accept': 'application/json, text/plain, */*'
	  }
	};

	utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
	  defaults.headers[method] = {};
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
	});

	var defaults_1 = defaults;

	function InterceptorManager() {
	  this.handlers = [];
	}

	/**
	 * Add a new interceptor to the stack
	 *
	 * @param {Function} fulfilled The function to handle `then` for a `Promise`
	 * @param {Function} rejected The function to handle `reject` for a `Promise`
	 *
	 * @return {Number} An ID used to remove interceptor later
	 */
	InterceptorManager.prototype.use = function use(fulfilled, rejected) {
	  this.handlers.push({
	    fulfilled: fulfilled,
	    rejected: rejected
	  });
	  return this.handlers.length - 1;
	};

	/**
	 * Remove an interceptor from the stack
	 *
	 * @param {Number} id The ID that was returned by `use`
	 */
	InterceptorManager.prototype.eject = function eject(id) {
	  if (this.handlers[id]) {
	    this.handlers[id] = null;
	  }
	};

	/**
	 * Iterate over all the registered interceptors
	 *
	 * This method is particularly useful for skipping over any
	 * interceptors that may have become `null` calling `eject`.
	 *
	 * @param {Function} fn The function to call for each interceptor
	 */
	InterceptorManager.prototype.forEach = function forEach(fn) {
	  utils.forEach(this.handlers, function forEachHandler(h) {
	    if (h !== null) {
	      fn(h);
	    }
	  });
	};

	var InterceptorManager_1 = InterceptorManager;

	/**
	 * Transform the data for a request or a response
	 *
	 * @param {Object|String} data The data to be transformed
	 * @param {Array} headers The headers for the request or response
	 * @param {Array|Function} fns A single function or Array of functions
	 * @returns {*} The resulting transformed data
	 */
	var transformData = function transformData(data, headers, fns) {
	  /*eslint no-param-reassign:0*/
	  utils.forEach(fns, function transform(fn) {
	    data = fn(data, headers);
	  });

	  return data;
	};

	var isCancel = function isCancel(value) {
	  return !!(value && value.__CANCEL__);
	};

	/**
	 * Determines whether the specified URL is absolute
	 *
	 * @param {string} url The URL to test
	 * @returns {boolean} True if the specified URL is absolute, otherwise false
	 */
	var isAbsoluteURL = function isAbsoluteURL(url) {
	  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
	  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
	  // by any combination of letters, digits, plus, period, or hyphen.
	  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
	};

	/**
	 * Creates a new URL by combining the specified URLs
	 *
	 * @param {string} baseURL The base URL
	 * @param {string} relativeURL The relative URL
	 * @returns {string} The combined URL
	 */
	var combineURLs = function combineURLs(baseURL, relativeURL) {
	  return relativeURL
	    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
	    : baseURL;
	};

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	function throwIfCancellationRequested(config) {
	  if (config.cancelToken) {
	    config.cancelToken.throwIfRequested();
	  }
	}

	/**
	 * Dispatch a request to the server using the configured adapter.
	 *
	 * @param {object} config The config that is to be used for the request
	 * @returns {Promise} The Promise to be fulfilled
	 */
	var dispatchRequest = function dispatchRequest(config) {
	  throwIfCancellationRequested(config);

	  // Support baseURL config
	  if (config.baseURL && !isAbsoluteURL(config.url)) {
	    config.url = combineURLs(config.baseURL, config.url);
	  }

	  // Ensure headers exist
	  config.headers = config.headers || {};

	  // Transform request data
	  config.data = transformData(
	    config.data,
	    config.headers,
	    config.transformRequest
	  );

	  // Flatten headers
	  config.headers = utils.merge(
	    config.headers.common || {},
	    config.headers[config.method] || {},
	    config.headers || {}
	  );

	  utils.forEach(
	    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
	    function cleanHeaderConfig(method) {
	      delete config.headers[method];
	    }
	  );

	  var adapter = config.adapter || defaults_1.adapter;

	  return adapter(config).then(function onAdapterResolution(response) {
	    throwIfCancellationRequested(config);

	    // Transform response data
	    response.data = transformData(
	      response.data,
	      response.headers,
	      config.transformResponse
	    );

	    return response;
	  }, function onAdapterRejection(reason) {
	    if (!isCancel(reason)) {
	      throwIfCancellationRequested(config);

	      // Transform response data
	      if (reason && reason.response) {
	        reason.response.data = transformData(
	          reason.response.data,
	          reason.response.headers,
	          config.transformResponse
	        );
	      }
	    }

	    return Promise.reject(reason);
	  });
	};

	/**
	 * Create a new instance of Axios
	 *
	 * @param {Object} instanceConfig The default config for the instance
	 */
	function Axios(instanceConfig) {
	  this.defaults = instanceConfig;
	  this.interceptors = {
	    request: new InterceptorManager_1(),
	    response: new InterceptorManager_1()
	  };
	}

	/**
	 * Dispatch a request
	 *
	 * @param {Object} config The config specific for this request (merged with this.defaults)
	 */
	Axios.prototype.request = function request(config) {
	  /*eslint no-param-reassign:0*/
	  // Allow for axios('example/url'[, config]) a la fetch API
	  if (typeof config === 'string') {
	    config = utils.merge({
	      url: arguments[0]
	    }, arguments[1]);
	  }

	  config = utils.merge(defaults_1, {method: 'get'}, this.defaults, config);
	  config.method = config.method.toLowerCase();

	  // Hook up interceptors middleware
	  var chain = [dispatchRequest, undefined];
	  var promise = Promise.resolve(config);

	  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
	    chain.unshift(interceptor.fulfilled, interceptor.rejected);
	  });

	  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
	    chain.push(interceptor.fulfilled, interceptor.rejected);
	  });

	  while (chain.length) {
	    promise = promise.then(chain.shift(), chain.shift());
	  }

	  return promise;
	};

	// Provide aliases for supported request methods
	utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url
	    }));
	  };
	});

	utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
	  /*eslint func-names:0*/
	  Axios.prototype[method] = function(url, data, config) {
	    return this.request(utils.merge(config || {}, {
	      method: method,
	      url: url,
	      data: data
	    }));
	  };
	});

	var Axios_1 = Axios;

	/**
	 * A `Cancel` is an object that is thrown when an operation is canceled.
	 *
	 * @class
	 * @param {string=} message The message.
	 */
	function Cancel(message) {
	  this.message = message;
	}

	Cancel.prototype.toString = function toString() {
	  return 'Cancel' + (this.message ? ': ' + this.message : '');
	};

	Cancel.prototype.__CANCEL__ = true;

	var Cancel_1 = Cancel;

	/**
	 * A `CancelToken` is an object that can be used to request cancellation of an operation.
	 *
	 * @class
	 * @param {Function} executor The executor function.
	 */
	function CancelToken(executor) {
	  if (typeof executor !== 'function') {
	    throw new TypeError('executor must be a function.');
	  }

	  var resolvePromise;
	  this.promise = new Promise(function promiseExecutor(resolve) {
	    resolvePromise = resolve;
	  });

	  var token = this;
	  executor(function cancel(message) {
	    if (token.reason) {
	      // Cancellation has already been requested
	      return;
	    }

	    token.reason = new Cancel_1(message);
	    resolvePromise(token.reason);
	  });
	}

	/**
	 * Throws a `Cancel` if cancellation has been requested.
	 */
	CancelToken.prototype.throwIfRequested = function throwIfRequested() {
	  if (this.reason) {
	    throw this.reason;
	  }
	};

	/**
	 * Returns an object that contains a new `CancelToken` and a function that, when called,
	 * cancels the `CancelToken`.
	 */
	CancelToken.source = function source() {
	  var cancel;
	  var token = new CancelToken(function executor(c) {
	    cancel = c;
	  });
	  return {
	    token: token,
	    cancel: cancel
	  };
	};

	var CancelToken_1 = CancelToken;

	/**
	 * Syntactic sugar for invoking a function and expanding an array for arguments.
	 *
	 * Common use case would be to use `Function.prototype.apply`.
	 *
	 *  ```js
	 *  function f(x, y, z) {}
	 *  var args = [1, 2, 3];
	 *  f.apply(null, args);
	 *  ```
	 *
	 * With `spread` this example can be re-written.
	 *
	 *  ```js
	 *  spread(function(x, y, z) {})([1, 2, 3]);
	 *  ```
	 *
	 * @param {Function} callback
	 * @returns {Function}
	 */
	var spread = function spread(callback) {
	  return function wrap(arr) {
	    return callback.apply(null, arr);
	  };
	};

	/**
	 * Create an instance of Axios
	 *
	 * @param {Object} defaultConfig The default config for the instance
	 * @return {Axios} A new instance of Axios
	 */
	function createInstance(defaultConfig) {
	  var context = new Axios_1(defaultConfig);
	  var instance = bind$1(Axios_1.prototype.request, context);

	  // Copy axios.prototype to instance
	  utils.extend(instance, Axios_1.prototype, context);

	  // Copy context to instance
	  utils.extend(instance, context);

	  return instance;
	}

	// Create the default instance to be exported
	var axios = createInstance(defaults_1);

	// Expose Axios class to allow class inheritance
	axios.Axios = Axios_1;

	// Factory for creating new instances
	axios.create = function create(instanceConfig) {
	  return createInstance(utils.merge(defaults_1, instanceConfig));
	};

	// Expose Cancel & CancelToken
	axios.Cancel = Cancel_1;
	axios.CancelToken = CancelToken_1;
	axios.isCancel = isCancel;

	// Expose all/spread
	axios.all = function all(promises) {
	  return Promise.all(promises);
	};
	axios.spread = spread;

	var axios_1 = axios;

	// Allow use of default import syntax in TypeScript
	var default_1 = axios;
	axios_1.default = default_1;

	var axios$1 = axios_1;

	// https://github.com/maxogden/websocket-stream/blob/48dc3ddf943e5ada668c31ccd94e9186f02fafbd/ws-fallback.js

	var ws = null;

	if (typeof WebSocket !== 'undefined') {
	  ws = WebSocket;
	} else if (typeof MozWebSocket !== 'undefined') {
	  ws = MozWebSocket;
	} else if (typeof commonjsGlobal !== 'undefined') {
	  ws = commonjsGlobal.WebSocket || commonjsGlobal.MozWebSocket;
	} else if (typeof window !== 'undefined') {
	  ws = window.WebSocket || window.MozWebSocket;
	} else if (typeof self !== 'undefined') {
	  ws = self.WebSocket || self.MozWebSocket;
	}

	var browser$2 = ws;

	function sleep(_x, _x2) {
	  return _sleep.apply(this, arguments);
	}

	function _sleep() {
	  _sleep = _asyncToGenerator(
	  /*#__PURE__*/
	  regeneratorRuntime.mark(function _callee(ms, msg) {
	    return regeneratorRuntime.wrap(function _callee$(_context) {
	      while (1) {
	        switch (_context.prev = _context.next) {
	          case 0:
	            return _context.abrupt("return", new Promise(function (resolve, reject) {
	              return setTimeout(function () {
	                if (msg) {
	                  return reject(msg);
	                }

	                resolve();
	              }, ms);
	            }));

	          case 1:
	          case "end":
	            return _context.stop();
	        }
	      }
	    }, _callee);
	  }));
	  return _sleep.apply(this, arguments);
	}

	var WS_CONN_TIMEOUT = 30 * 1000; // 30 secs.

	var RPC_TIMEOUT = 120 * 1000; // 120 secs.

	var WS_CONN_TIMEOUT_ERROR = 'ws_connection_timeout';
	var RPC_TIMEOUT_ERROR = 'rpc_timeout';
	var Provider =
	/*#__PURE__*/
	function () {
	  function Provider(config) {
	    _classCallCheck(this, Provider);

	    this.config = config;
	  }

	  _createClass(Provider, [{
	    key: "getAuth",
	    value: function () {
	      var _getAuth = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee() {
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                return _context.abrupt("return", {
	                  headers: this.config.auth && this.config.auth.headers || {},
	                  args: this.config.auth && this.config.auth.args || {}
	                });

	              case 1:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function getAuth() {
	        return _getAuth.apply(this, arguments);
	      }

	      return getAuth;
	    }()
	  }, {
	    key: "makeRPC",
	    value: function () {
	      var _makeRPC = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee2(name, args) {
	        return regeneratorRuntime.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                throw 'Not implemented';

	              case 1:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2);
	      }));

	      function makeRPC(_x, _x2) {
	        return _makeRPC.apply(this, arguments);
	      }

	      return makeRPC;
	    }()
	  }, {
	    key: "start",
	    value: function () {
	      var _start = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee3() {
	        return regeneratorRuntime.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee3);
	      }));

	      function start() {
	        return _start.apply(this, arguments);
	      }

	      return start;
	    }()
	  }, {
	    key: "stop",
	    value: function () {
	      var _stop = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee4() {
	        return regeneratorRuntime.wrap(function _callee4$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	              case "end":
	                return _context4.stop();
	            }
	          }
	        }, _callee4);
	      }));

	      function stop() {
	        return _stop.apply(this, arguments);
	      }

	      return stop;
	    }()
	  }, {
	    key: "destroy",
	    value: function () {
	      var _destroy = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee5() {
	        return regeneratorRuntime.wrap(function _callee5$(_context5) {
	          while (1) {
	            switch (_context5.prev = _context5.next) {
	              case 0:
	              case "end":
	                return _context5.stop();
	            }
	          }
	        }, _callee5);
	      }));

	      function destroy() {
	        return _destroy.apply(this, arguments);
	      }

	      return destroy;
	    }()
	  }]);

	  return Provider;
	}();
	var HTTPProvider =
	/*#__PURE__*/
	function (_Provider) {
	  _inherits(HTTPProvider, _Provider);

	  function HTTPProvider(config) {
	    var _this;

	    _classCallCheck(this, HTTPProvider);

	    _this = _possibleConstructorReturn(this, _getPrototypeOf(HTTPProvider).call(this, config));
	    _this.config = config || {};
	    _this.endpoint = _this.config.url || 'http://localhost:20000/rpc';
	    return _this;
	  }

	  _createClass(HTTPProvider, [{
	    key: "makeRPC",
	    value: function () {
	      var _makeRPC2 = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee6(name, args) {
	        var auth, headers, data, response;
	        return regeneratorRuntime.wrap(function _callee6$(_context6) {
	          while (1) {
	            switch (_context6.prev = _context6.next) {
	              case 0:
	                _context6.next = 2;
	                return this.getAuth();

	              case 2:
	                auth = _context6.sent;
	                headers = Object.assign({
	                  'Content-Type': 'application/json'
	                }, auth.headers);
	                args = Object.assign({}, args, auth.args);
	                data = {
	                  "jsonrpc": "2.0",
	                  "method": name,
	                  "params": [args],
	                  "id": "1"
	                };
	                _context6.next = 8;
	                return axios$1.request({
	                  url: this.endpoint,
	                  method: 'post',
	                  headers: headers,
	                  data: data
	                });

	              case 8:
	                response = _context6.sent;

	                if (!(response.status != 200)) {
	                  _context6.next = 11;
	                  break;
	                }

	                throw "Request failed: ".concat(response.statusCode);

	              case 11:
	                if (response.data) {
	                  _context6.next = 13;
	                  break;
	                }

	                throw "Empty server response";

	              case 13:

	                if (!response.data.error) {
	                  _context6.next = 16;
	                  break;
	                }

	                throw "Server error: ".concat(JSON.stringify(response.data.error));

	              case 16:
	                return _context6.abrupt("return", response.data.result);

	              case 17:
	              case "end":
	                return _context6.stop();
	            }
	          }
	        }, _callee6, this);
	      }));

	      function makeRPC(_x3, _x4) {
	        return _makeRPC2.apply(this, arguments);
	      }

	      return makeRPC;
	    }()
	  }]);

	  return HTTPProvider;
	}(Provider);
	var WebSocketProvider =
	/*#__PURE__*/
	function (_Provider2) {
	  _inherits(WebSocketProvider, _Provider2);

	  function WebSocketProvider(config) {
	    var _this2;

	    _classCallCheck(this, WebSocketProvider);

	    _this2 = _possibleConstructorReturn(this, _getPrototypeOf(WebSocketProvider).call(this, config));
	    _this2.config = config || {};
	    _this2.endpoint = _this2.config.url || 'ws://localhost:20000/ws';
	    _this2.queuedCalls = [];
	    _this2.pendingCalls = {};
	    _this2.callID = 0; // A mapping from error(string) to number of occurrence.

	    _this2.errorCount = {};
	    return _this2;
	  } // Set up ws connection. May throws timeout exception.


	  _createClass(WebSocketProvider, [{
	    key: "start",
	    value: function () {
	      var _start2 = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee7() {
	        var _this3 = this;

	        var connectWS;
	        return regeneratorRuntime.wrap(function _callee7$(_context7) {
	          while (1) {
	            switch (_context7.prev = _context7.next) {
	              case 0:
	                connectWS = new Promise(function (resolve, reject) {
	                  // // Random timeout for testing
	                  // if (Math.random() < 1) {
	                  //     return
	                  // }
	                  _this3.client = new browser$2(_this3.endpoint);

	                  _this3.client.onopen = function () {
	                    _this3.errorCount[WS_CONN_TIMEOUT_ERROR] = 0; //Dequeue any queued called since we are connected now!

	                    _this3.dequeueCalls();

	                    resolve();
	                  };

	                  _this3.client.onclose = function () {
	                    //Reset the client so it will reconnect later when needed
	                    _this3.client = null;
	                  };

	                  _this3.client.onerror = function () {
	                    //Reset the client so it will reconnect later when needed
	                    _this3.client = null;
	                  };

	                  _this3.client.onmessage = _this3.onResponse.bind(_this3);
	                });
	                _context7.next = 3;
	                return Promise.race([sleep(WS_CONN_TIMEOUT, {
	                  key: WS_CONN_TIMEOUT_ERROR
	                }), connectWS]);

	              case 3:
	              case "end":
	                return _context7.stop();
	            }
	          }
	        }, _callee7);
	      }));

	      function start() {
	        return _start2.apply(this, arguments);
	      }

	      return start;
	    }()
	  }, {
	    key: "stop",
	    value: function stop() {
	      if (this.client) {
	        this.client.close();
	        this.client = null;
	      }
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.stop();
	      this.destroyed = true;
	    }
	  }, {
	    key: "onResponse",
	    value: function onResponse(msg) {
	      var data = {};

	      try {
	        data = JSON.parse(msg.data);
	      } catch (e) {
	        reject(msg.data);
	      }

	      if (!this.pendingCalls[data.id]) {
	        return;
	      }

	      var _this$pendingCalls$da = _slicedToArray(this.pendingCalls[data.id], 2),
	          resolve = _this$pendingCalls$da[0],
	          reject = _this$pendingCalls$da[1];

	      if (data.error) {
	        reject(data.error);
	      } else {
	        resolve(data.result);
	      }
	    }
	  }, {
	    key: "dequeueCalls",
	    value: function dequeueCalls() {
	      //Dequeue any queued called since we are connected now!
	      var callsToDequeue = this.queuedCalls;
	      this.queuedCalls = [];

	      for (var i = 0; i < callsToDequeue.length; i++) {
	        var callTuple = callsToDequeue[i];
	        this.makeRPC(callTuple[0], callTuple[1]);
	      }
	    }
	  }, {
	    key: "reconnect",
	    value: function () {
	      var _reconnect = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee8() {
	        return regeneratorRuntime.wrap(function _callee8$(_context8) {
	          while (1) {
	            switch (_context8.prev = _context8.next) {
	              case 0:
	                if (this.client) {
	                  _context8.next = 4;
	                  break;
	                }

	                Logger.info("WebSocketProvider: reconnecting because the client was null!");
	                _context8.next = 4;
	                return this.start();

	              case 4:
	              case "end":
	                return _context8.stop();
	            }
	          }
	        }, _callee8, this);
	      }));

	      function reconnect() {
	        return _reconnect.apply(this, arguments);
	      }

	      return reconnect;
	    }() // makeRPC tries to make a remote call. it retries if timed out for the first time, throws excpetion
	    // on certain count of retry failures, otherwises blocks forver.

	  }, {
	    key: "makeRPC",
	    value: function () {
	      var _makeRPC3 = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee10(name, args) {
	        var _this4 = this;

	        return regeneratorRuntime.wrap(function _callee10$(_context10) {
	          while (1) {
	            switch (_context10.prev = _context10.next) {
	              case 0:
	                return _context10.abrupt("return", new Promise(
	                /*#__PURE__*/
	                function () {
	                  var _ref = _asyncToGenerator(
	                  /*#__PURE__*/
	                  regeneratorRuntime.mark(function _callee9(resolve, reject) {
	                    var result, n;
	                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
	                      while (1) {
	                        switch (_context9.prev = _context9.next) {
	                          case 0:

	                            if (!_this4.destroyed) {
	                              _context9.next = 3;
	                              break;
	                            }

	                            return _context9.abrupt("return");

	                          case 3:
	                            _context9.prev = 3;
	                            _context9.next = 6;
	                            return _this4._RPC(name, args);

	                          case 6:
	                            result = _context9.sent;
	                            // RPC succeeded, reset counter.
	                            _this4.errorCount["".concat(RPC_TIMEOUT_ERROR, ":").concat(name)] = 0;
	                            resolve(result);
	                            return _context9.abrupt("return");

	                          case 12:
	                            _context9.prev = 12;
	                            _context9.t0 = _context9["catch"](3);

	                            if (_context9.t0.key) {
	                              _context9.next = 17;
	                              break;
	                            }

	                            // Unknown exception, re-throw.
	                            reject(_context9.t0);
	                            return _context9.abrupt("return");

	                          case 17:
	                            // Retry and dedup exceptions.
	                            _this4.errorCount[_context9.t0.key] = (_this4.errorCount[_context9.t0.key] || 0) + 1;
	                            n = _this4.errorCount[_context9.t0.key]; // Always retry a second time.

	                            if (!(n == 1)) {
	                              _context9.next = 21;
	                              break;
	                            }

	                            return _context9.abrupt("continue", 0);

	                          case 21:
	                            // Recreate websocket connection on 5 + 30k failure.
	                            if (n % 30 == 5) {
	                              try {
	                                _this4.client.close();
	                              } catch (_) {}

	                              _this4.client = null;
	                            } // Throw exception on exponential counts.


	                            if (!(n == 2 || n == 10 || n == 100)) {
	                              _context9.next = 25;
	                              break;
	                            }

	                            reject("Error  ".concat(_context9.t0.key, " occurred ").concat(n, " times in a row"));
	                            return _context9.abrupt("return");

	                          case 25:
	                            return _context9.abrupt("return");

	                          case 26:
	                            _context9.next = 0;
	                            break;

	                          case 28:
	                          case "end":
	                            return _context9.stop();
	                        }
	                      }
	                    }, _callee9, null, [[3, 12]]);
	                  }));

	                  return function (_x7, _x8) {
	                    return _ref.apply(this, arguments);
	                  };
	                }()));

	              case 1:
	              case "end":
	                return _context10.stop();
	            }
	          }
	        }, _callee10);
	      }));

	      function makeRPC(_x5, _x6) {
	        return _makeRPC3.apply(this, arguments);
	      }

	      return makeRPC;
	    }()
	  }, {
	    key: "_RPC",
	    value: function () {
	      var _RPC2 = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee12(name, args) {
	        var _this5 = this;

	        return regeneratorRuntime.wrap(function _callee12$(_context12) {
	          while (1) {
	            switch (_context12.prev = _context12.next) {
	              case 0:
	                return _context12.abrupt("return", new Promise(
	                /*#__PURE__*/
	                function () {
	                  var _ref2 = _asyncToGenerator(
	                  /*#__PURE__*/
	                  regeneratorRuntime.mark(function _callee11(resolve, reject) {
	                    var auth, executeCall, res;
	                    return regeneratorRuntime.wrap(function _callee11$(_context11) {
	                      while (1) {
	                        switch (_context11.prev = _context11.next) {
	                          case 0:
	                            _context11.prev = 0;

	                            if (_this5.destroyed) {
	                              reject(null);
	                            }

	                            _context11.next = 4;
	                            return _this5.getAuth();

	                          case 4:
	                            auth = _context11.sent;

	                            if (_this5.client) {
	                              _context11.next = 8;
	                              break;
	                            }

	                            _context11.next = 8;
	                            return _this5.reconnect();

	                          case 8:
	                            if (!(!_this5.client || _this5.client.readyState !== browser$2.OPEN)) {
	                              _context11.next = 11;
	                              break;
	                            }

	                            //Queue this call once the websocket connects
	                            _this5.queuedCalls.push([name, args]); // Return silently without doing either resolve or reject.


	                            return _context11.abrupt("return");

	                          case 11:
	                            executeCall = new Promise(function (resolve, reject) {
	                              // // Random timeout for testing
	                              // if (Math.random() < 1) {
	                              //     return
	                              // }
	                              args = Object.assign({}, args, auth.args);
	                              var reqBody = {
	                                "jsonrpc": "2.0",
	                                "method": name,
	                                "params": [args],
	                                "id": _this5.callID++
	                              };
	                              _this5.pendingCalls[reqBody.id] = [resolve, reject];

	                              _this5.client.send(JSON.stringify(reqBody));
	                            });
	                            _context11.next = 14;
	                            return Promise.race([sleep(RPC_TIMEOUT, {
	                              key: "".concat(RPC_TIMEOUT_ERROR, ":").concat(name)
	                            }), executeCall]);

	                          case 14:
	                            res = _context11.sent;
	                            resolve(res);
	                            _context11.next = 21;
	                            break;

	                          case 18:
	                            _context11.prev = 18;
	                            _context11.t0 = _context11["catch"](0);
	                            reject(_context11.t0);

	                          case 21:
	                          case "end":
	                            return _context11.stop();
	                        }
	                      }
	                    }, _callee11, null, [[0, 18]]);
	                  }));

	                  return function (_x11, _x12) {
	                    return _ref2.apply(this, arguments);
	                  };
	                }()));

	              case 1:
	              case "end":
	                return _context12.stop();
	            }
	          }
	        }, _callee12);
	      }));

	      function _RPC(_x9, _x10) {
	        return _RPC2.apply(this, arguments);
	      }

	      return _RPC;
	    }()
	  }]);

	  return WebSocketProvider;
	}(Provider);

	var DEFAULT_CONFIG = {};
	var PAYMENT_ERROR_SERVER_CODE = 1;
	var PAYMENT_ERROR_NOT_LOGIN_CODE = 3;
	var PAYMENT_ERROR_NO_INVOICE_CODE = 4;
	var PAYMENT_ERROR_SERVER_MSG = 'Server error';
	var PAYMENT_ERROR_NOT_LOGIN_MSG = 'User not logged in';
	var PAYMENT_ERROR_NO_INVOICE_MSG = 'No invoice recevied';
	var WalletService =
	/*#__PURE__*/
	function () {
	  function WalletService(config) {
	    _classCallCheck(this, WalletService);

	    this.config = Object.assign({}, DEFAULT_CONFIG, config);
	    this.provider = this.config.provider; // Latest on-chain account state. Call this.getAccount() to update.

	    this.account = null; // Auth tokens issued by tracker.

	    this.auth = {};
	  }

	  _createClass(WalletService, [{
	    key: "setContext",
	    value: function setContext(ctx) {
	      this.context = ctx;
	    }
	  }, {
	    key: "setProvider",
	    value: function setProvider(p) {
	      this.provider = p;
	    }
	  }, {
	    key: "start",
	    value: function () {
	      var _start = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee() {
	        return regeneratorRuntime.wrap(function _callee$(_context) {
	          while (1) {
	            switch (_context.prev = _context.next) {
	              case 0:
	                this._update_timer = setInterval(this._getAccount.bind(this), 60 * 1000);
	                _context.next = 3;
	                return this._getAccount();

	              case 3:
	              case "end":
	                return _context.stop();
	            }
	          }
	        }, _callee, this);
	      }));

	      function start() {
	        return _start.apply(this, arguments);
	      }

	      return start;
	    }()
	  }, {
	    key: "stop",
	    value: function stop() {
	      clearInterval(this._update_timer);

	      if (this.provider) {
	        this.provider.destroy();
	        this.provider = null;
	      }
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      this.stop();
	      this.context = null;
	    } // -------------- High level payment interface -------------

	  }, {
	    key: "getAccount",
	    value: function () {
	      var _getAccount2 = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee2() {
	        return regeneratorRuntime.wrap(function _callee2$(_context2) {
	          while (1) {
	            switch (_context2.prev = _context2.next) {
	              case 0:
	                return _context2.abrupt("return", this._getAccount());

	              case 1:
	              case "end":
	                return _context2.stop();
	            }
	          }
	        }, _callee2, this);
	      }));

	      function getAccount() {
	        return _getAccount2.apply(this, arguments);
	      }

	      return getAccount;
	    }() // isReady returns whether wallet is ready for use. Wallet turns ready once account information
	    // is retrieved.

	  }, {
	    key: "isReady",
	    value: function isReady() {
	      return !!this.account;
	    } // Remove expired tokens.

	  }, {
	    key: "_removeExpiredTokens",
	    value: function _removeExpiredTokens() {
	      for (var key in this.auth) {
	        if (this.auth[key].exp <= Math.floor(Date.now() / 1000)) {
	          delete this.auth[key];
	        }
	      }
	    } // addAuth adds a payment auth token. Auth token can be added either from tracker's
	    // peers list, or from peer's payment.

	  }, {
	    key: "addAuth",
	    value: function addAuth(userid, expiresAt, token) {
	      if (!userid) {
	        return;
	      }

	      this._removeExpiredTokens();

	      if (!this.auth[userid] || this.auth[userid].exp < expiresAt) {
	        this.auth[userid] = {
	          exp: expiresAt,
	          token: token
	        };
	      }
	    } // getAuth returns unexpired auth token for given userID if exists.

	  }, {
	    key: "getAuth",
	    value: function getAuth(userID) {
	      this._removeExpiredTokens();

	      return this.auth[userID];
	    } //
	    // createInvoice is invoked on the payment receiver to create an invoice, which then should be
	    // sent to payment sender.
	    //

	  }, {
	    key: "createInvoice",
	    value: function createInvoice(remoteUserID, resourceId) {
	      if (!this.account) {
	        return null;
	      }

	      var ret = {
	        resourceId: resourceId,
	        userId: this.account.user_id,
	        partnerId: this.account.partner_id,
	        address: this.account.recv_account.address,
	        auth: this.getAuth(remoteUserID),
	        v: '2'
	      };
	      Logger.log("createInvoice(): remoteUserID: ".concat(remoteUserID, ", invoice: ").concat(JSON.stringify(ret)));
	      return ret;
	    } // _buildPaymentError() makes an response with given error.

	  }, {
	    key: "_buildPaymentError",
	    value: function _buildPaymentError(code, msg) {
	      return {
	        amount: new bignumber(0),
	        accumulatedAmount: new bignumber(0),
	        error: {
	          code: code,
	          msg: msg
	        }
	      };
	    } //
	    // createPayment creates a payment object to be sent to receiver.
	    // invoice is created by createInvoice().
	    //

	  }, {
	    key: "createPayment",
	    value: function () {
	      var _createPayment2 = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee3(invoice) {
	        return regeneratorRuntime.wrap(function _callee3$(_context3) {
	          while (1) {
	            switch (_context3.prev = _context3.next) {
	              case 0:
	                if (invoice) {
	                  _context3.next = 2;
	                  break;
	                }

	                return _context3.abrupt("return", this._buildPaymentError(PAYMENT_ERROR_NO_INVOICE_CODE, PAYMENT_ERROR_NO_INVOICE_MSG));

	              case 2:
	                if (this.account) {
	                  _context3.next = 4;
	                  break;
	                }

	                return _context3.abrupt("return", this._buildPaymentError(PAYMENT_ERROR_NOT_LOGIN_CODE, PAYMENT_ERROR_NOT_LOGIN_MSG));

	              case 4:
	                _context3.next = 6;
	                return this.createPayment2(invoice);

	              case 6:
	                return _context3.abrupt("return", _context3.sent);

	              case 7:
	              case "end":
	                return _context3.stop();
	            }
	          }
	        }, _callee3, this);
	      }));

	      function createPayment(_x) {
	        return _createPayment2.apply(this, arguments);
	      }

	      return createPayment;
	    }()
	  }, {
	    key: "createPayment2",
	    value: function () {
	      var _createPayment3 = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee4(invoice) {
	        var resourceId, address, v, paymentResp, auth;
	        return regeneratorRuntime.wrap(function _callee4$(_context4) {
	          while (1) {
	            switch (_context4.prev = _context4.next) {
	              case 0:
	                resourceId = invoice.resourceId, address = invoice.address, v = invoice.v;
	                Logger.log("createPayment2(): invoice: ".concat(JSON.stringify(invoice)));
	                auth = invoice.auth || this.getAuth(invoice.userId);
	                _context4.prev = 3;
	                _context4.next = 6;
	                return this._createPayment(address, resourceId, invoice.v, auth && auth.token);

	              case 6:
	                paymentResp = _context4.sent;

	                if (!(!paymentResp || !paymentResp.tx)) {
	                  _context4.next = 9;
	                  break;
	                }

	                return _context4.abrupt("return", this._buildPaymentError(PAYMENT_ERROR_SERVER_CODE, PAYMENT_ERROR_SERVER_MSG));

	              case 9:
	                _context4.next = 15;
	                break;

	              case 11:
	                _context4.prev = 11;
	                _context4.t0 = _context4["catch"](3);
	                Logger.log("createPayment2(): error: failed to create payment: ", _context4.t0);
	                return _context4.abrupt("return", this._buildPaymentError(PAYMENT_ERROR_SERVER_CODE, PAYMENT_ERROR_SERVER_MSG + ':' + JSON.stringify(_context4.t0)));

	              case 15:
	                return _context4.abrupt("return", {
	                  resourceId: resourceId,
	                  sourceAddress: this.account.recv_account.address,
	                  sourceUserId: this.account.user_id,
	                  sourcePartnerId: this.account.partner_id,
	                  targetAddress: address,
	                  amount: new bignumber(paymentResp.amount || 0),
	                  accumulatedAmount: new bignumber(paymentResp.tx.source.coins.tfuelwei),
	                  paymentHex: paymentResp.payment,
	                  reserveSequence: new bignumber(paymentResp.tx.reserve_sequence),
	                  paymentSequence: new bignumber(paymentResp.tx.payment_sequence),
	                  auth: this.getAuth(invoice.userId),
	                  v: v,
	                  error: null
	                });

	              case 16:
	              case "end":
	                return _context4.stop();
	            }
	          }
	        }, _callee4, this, [[3, 11]]);
	      }));

	      function createPayment2(_x2) {
	        return _createPayment3.apply(this, arguments);
	      }

	      return createPayment2;
	    }() //
	    // receivePayment saves a payment object. Currently no action is needed as payment submissino are now
	    // handled by vault service.
	    //

	  }, {
	    key: "receivePayment",
	    value: function () {
	      var _receivePayment = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee5(payment) {
	        return regeneratorRuntime.wrap(function _callee5$(_context5) {
	          while (1) {
	            switch (_context5.prev = _context5.next) {
	              case 0:
	                return _context5.abrupt("return");

	              case 1:
	              case "end":
	                return _context5.stop();
	            }
	          }
	        }, _callee5);
	      }));

	      function receivePayment(_x3) {
	        return _receivePayment.apply(this, arguments);
	      }

	      return receivePayment;
	    }() // getTFuelBalance returns TFuel balance in the cached account.

	  }, {
	    key: "getTFuelBalance",
	    value: function getTFuelBalance() {
	      var getTFuel = function getTFuel(acc) {
	        if (acc.coins != null) {
	          return acc.coins.tfuelwei;
	        }

	        return -1;
	      };

	      if (!this.account) {
	        return {
	          sa: -1,
	          ra: -1
	        };
	      }

	      return {
	        sa: getTFuel(this.account.send_account),
	        ra: getTFuel(this.account.recv_account)
	      };
	    } //
	    // ------------------ Private methods --------------------
	    //
	    // ----------------- Abstract methods --------------------

	  }, {
	    key: "_makeRPC",
	    value: function () {
	      var _makeRPC2 = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee6(name, args) {
	        return regeneratorRuntime.wrap(function _callee6$(_context6) {
	          while (1) {
	            switch (_context6.prev = _context6.next) {
	              case 0:
	                if (this.config.provider) {
	                  _context6.next = 2;
	                  break;
	                }

	                throw 'No provider is set.';

	              case 2:
	                _context6.next = 4;
	                return this.config.provider.makeRPC(name, args);

	              case 4:
	                return _context6.abrupt("return", _context6.sent);

	              case 5:
	              case "end":
	                return _context6.stop();
	            }
	          }
	        }, _callee6, this);
	      }));

	      function _makeRPC(_x4, _x5) {
	        return _makeRPC2.apply(this, arguments);
	      }

	      return _makeRPC;
	    }() // --------------------- RPC calls -----------------------
	    // _RPC wraps over _makeRPC to count RPC results.

	  }, {
	    key: "_RPC",
	    value: function () {
	      var _RPC2 = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee7(name, args) {
	        var res, result;
	        return regeneratorRuntime.wrap(function _callee7$(_context7) {
	          while (1) {
	            switch (_context7.prev = _context7.next) {
	              case 0:
	                _context7.prev = 0;
	                _context7.next = 3;
	                return this._makeRPC(name, args);

	              case 3:
	                res = _context7.sent;

	                if (this.context) {
	                  this.context.playerStats.walletRPCSucceeded("".concat(name, ":ok"));

	                  if (name == 'theta.ReserveFund') {
	                    this.context.playerStats.walletReserveSucceeded();
	                  } else if (name == 'theta.SubmitServicePayment') {
	                    this.context.playerStats.walletSubmitPaymentSucceeded();
	                  }
	                }

	                return _context7.abrupt("return", res);

	              case 8:
	                _context7.prev = 8;
	                _context7.t0 = _context7["catch"](0);

	                if (this.context) {
	                  result = null;
	                  result = _context7.t0.message || 'unknown_error';
	                  this.context.playerStats.walletRPCFailed("".concat(name, ":").concat(result));

	                  if (name == 'theta.ReserveFund') {
	                    this.context.playerStats.walletReserveFailed();
	                  } else if (name == 'theta.SubmitServicePayment') {
	                    this.context.playerStats.walletSubmitPaymentFailed();
	                  }
	                }

	                Logger.error("_RPC(): ".concat(JSON.stringify(_context7.t0)));
	                throw _context7.t0;

	              case 13:
	              case "end":
	                return _context7.stop();
	            }
	          }
	        }, _callee7, this, [[0, 8]]);
	      }));

	      function _RPC(_x6, _x7) {
	        return _RPC2.apply(this, arguments);
	      }

	      return _RPC;
	    }()
	  }, {
	    key: "_getAccount",
	    value: function () {
	      var _getAccount3 = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee8() {
	        var result;
	        return regeneratorRuntime.wrap(function _callee8$(_context8) {
	          while (1) {
	            switch (_context8.prev = _context8.next) {
	              case 0:
	                _context8.next = 2;
	                return this._RPC('theta.GetAccount');

	              case 2:
	                result = _context8.sent;
	                this.account = result;

	                if (this.context) {
	                  this.context.trigger(ThetaEvents.ACCOUNT_UPDATED, {
	                    account: result
	                  });
	                }

	                return _context8.abrupt("return", this.account);

	              case 6:
	              case "end":
	                return _context8.stop();
	            }
	          }
	        }, _callee8, this);
	      }));

	      function _getAccount() {
	        return _getAccount3.apply(this, arguments);
	      }

	      return _getAccount;
	    }()
	  }, {
	    key: "_createPayment",
	    value: function () {
	      var _createPayment4 = _asyncToGenerator(
	      /*#__PURE__*/
	      regeneratorRuntime.mark(function _callee9(address, resourceId, v, auth) {
	        return regeneratorRuntime.wrap(function _callee9$(_context9) {
	          while (1) {
	            switch (_context9.prev = _context9.next) {
	              case 0:
	                _context9.next = 2;
	                return this._RPC('theta.CreateServicePayment', {
	                  to: address,
	                  resource_id: resourceId,
	                  v: v,
	                  auth: auth
	                });

	              case 2:
	                return _context9.abrupt("return", _context9.sent);

	              case 3:
	              case "end":
	                return _context9.stop();
	            }
	          }
	        }, _callee9, this);
	      }));

	      function _createPayment(_x8, _x9, _x10, _x11) {
	        return _createPayment4.apply(this, arguments);
	      }

	      return _createPayment;
	    }()
	  }]);

	  return WalletService;
	}();

	var Theta =
	/*#__PURE__*/
	function () {
	  _createClass(Theta, null, [{
	    key: "registerPlugin",
	    value: function registerPlugin(pluginName, pluginClass) {
	      if (!Theta.plugins_) {
	        Theta.plugins_ = {};
	      }

	      Theta.plugins_[pluginName] = pluginClass;
	    }
	  }, {
	    key: "getPlugin",
	    value: function getPlugin(name) {
	      if (!name) {
	        return;
	      }

	      if (Theta.plugins_ && Theta.plugins_[name]) {
	        return Theta.plugins_[name];
	      }
	    }
	  }, {
	    key: "getLogger",
	    value: function getLogger() {
	      return Logger;
	    }
	    /**
	     * @type {ThetaEvents}
	     */

	  }, {
	    key: "setDebug",
	    value: function setDebug(enabled) {
	      Logger.setLoggingEnabled(enabled); //Pass down to the plugins as well
	      // Logger.info("Also, setting setDebug: ", enabled, " on plugins!");
	      // if(Theta.HlsJsFragmentLoader){
	      //   Theta.HlsJsFragmentLoader.setDebug(enabled);
	      // }
	    }
	    /**
	     * @deprecated Use isPeeringEnabled instead.
	     */

	  }, {
	    key: "toggleUseCDN",
	    value: function toggleUseCDN() {
	      Theta.HlsJsFragmentLoader.toggleUseCDN();
	      Theta.P2P.toggleUseCDN();
	    }
	  }, {
	    key: "Events",
	    get: function get() {
	      return ThetaEvents;
	    }
	    /**
	     * @type {ThetaTrafficType}
	     */

	  }, {
	    key: "TrafficType",
	    get: function get() {
	      return ThetaTrafficType;
	    }
	    /**
	     * @type {WalletService}
	     */

	  }, {
	    key: "Wallet",
	    get: function get() {
	      return WalletService;
	    }
	    /**
	     * @type {WebSocketProvider}
	     */

	  }, {
	    key: "WalletWebSocketProvider",
	    get: function get() {
	      return WebSocketProvider;
	    }
	  }, {
	    key: "HTTPProvider",
	    get: function get() {
	      //Note: WalletWebSocketProvider is preferred
	      return HTTPProvider;
	    }
	    /**
	     * @deprecated Use getPlugin instead.
	     */

	  }, {
	    key: "HlsJsFragmentLoader",
	    get: function get() {
	      // if(window.ThetaHlsJsFragmentLoader){
	      //   //Backward compat for UMD plugins
	      //   return window.ThetaHlsJsFragmentLoader;
	      // }
	      // else{
	      //   return Theta.getPlugin("hlsjs");
	      // }
	      return Theta.getPlugin("hlsjs");
	    }
	  }, {
	    key: "P2P",
	    get: function get() {
	      return P2P;
	    }
	  }, {
	    key: "DefaultConfig",
	    get: function get() {
	      return thetaDefaultConfig;
	    }
	  }, {
	    key: "isPeeringEnabled",
	    get: function get() {
	      return Theta.P2P.isPeeringEnabled;
	    },
	    set: function set(peering) {
	      Theta.HlsJsFragmentLoader.isPeeringEnabled = peering;
	      Theta.P2P.isPeeringEnabled = peering;
	    }
	  }]);

	  function Theta() {
	    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

	    _classCallCheck(this, Theta);

	    var defaultConfig = Theta.DefaultConfig;

	    for (var prop in defaultConfig) {
	      if (prop in config) continue;
	      config[prop] = defaultConfig[prop];
	    }

	    if (config['debug'] === true) {
	      Theta.setDebug(true);
	    }

	    this.config = config;
	    var httpProtocol = config.trackerServer.secure ? 'https://' : 'http://';
	    var trackerServerURL = httpProtocol + config.trackerServer.host + ':' + config.trackerServer.port + config.trackerServer.path;
	    this.socket = lib$1(trackerServerURL);
	    this.cache = new ThetaCache();
	    this.cache.start();
	    this.p2p = new P2P({
	      context: this,
	      userId: config.userId,
	      videoId: config.videoId,
	      probeTimeout: config.probeTimeout,
	      fragmentTimeout: Math.floor(config.fragmentSize * config.failoverFactor),
	      allowRangeRequests: config.allowRangeRequests,
	      server: {
	        host: config.peerServer.host,
	        port: config.peerServer.port,
	        secure: config.peerServer.secure
	      }
	    });
	    this.p2p.start();
	    var voidWallet = null;

	    if (!config.wallet) {
	      var VoidThetaWalletWebSocketProvider =
	      /*#__PURE__*/
	      function (_Theta$WalletWebSocke) {
	        _inherits(VoidThetaWalletWebSocketProvider, _Theta$WalletWebSocke);

	        function VoidThetaWalletWebSocketProvider() {
	          _classCallCheck(this, VoidThetaWalletWebSocketProvider);

	          return _possibleConstructorReturn(this, _getPrototypeOf(VoidThetaWalletWebSocketProvider).apply(this, arguments));
	        }

	        _createClass(VoidThetaWalletWebSocketProvider, [{
	          key: "getAuth",
	          value: function () {
	            var _getAuth = _asyncToGenerator(
	            /*#__PURE__*/
	            regeneratorRuntime.mark(function _callee() {
	              return regeneratorRuntime.wrap(function _callee$(_context) {
	                while (1) {
	                  switch (_context.prev = _context.next) {
	                    case 0:
	                      return _context.abrupt("return", {});

	                    case 1:
	                    case "end":
	                      return _context.stop();
	                  }
	                }
	              }, _callee);
	            }));

	            function getAuth() {
	              return _getAuth.apply(this, arguments);
	            }

	            return getAuth;
	          }()
	        }]);

	        return VoidThetaWalletWebSocketProvider;
	      }(Theta.WalletWebSocketProvider);

	      var walletProvider = new VoidThetaWalletWebSocketProvider();
	      voidWallet = new Theta.Wallet({
	        provider: walletProvider
	      });
	    }

	    this.wallet = config.wallet || voidWallet;
	    this.wallet.setContext(this);
	    this.playerStats = new PlayerStats(this, config.videoId);
	    this.playerStats.setFragmentSize(config.fragmentSize);
	    this.playerStats.start();
	    this.eventHandlers_ = {};
	    this.widgetConnected = false;
	  }

	  _createClass(Theta, [{
	    key: "start",
	    value: function start() {}
	  }, {
	    key: "addEventListener",
	    value: function addEventListener(name, handler) {
	      if (this.eventHandlers_.hasOwnProperty(name)) {
	        this.eventHandlers_[name].push(handler);
	      } else {
	        this.eventHandlers_[name] = [handler];
	      }
	    }
	  }, {
	    key: "removeEventListener",
	    value: function removeEventListener(name, handler) {
	      /* This is a bit tricky, because how would you identify functions?
	             This simple solution should work if you pass THE SAME handler. */
	      if (!this.eventHandlers_.hasOwnProperty(name)) return;
	      var index = this.eventHandlers_[name].indexOf(handler);
	      if (index !== -1) this.eventHandlers_[name].splice(index, 1);
	    }
	  }, {
	    key: "trigger",
	    value: function trigger(name, data) {
	      Logger.log('Trigger Event.name:', name);
	      if (!this.eventHandlers_.hasOwnProperty(name)) return;
	      var evs = this.eventHandlers_[name],
	          l = evs.length;

	      for (var _i = 0; _i < l; _i++) {
	        var f = evs[_i];
	        f(data);
	      } //Pass the event to the window (or the parent window) where the widget can get it


	      if (this.widgetConnected) {
	        //TODO have support for the dev to pass in the domains to whitelist...we can loop over them and send the event to those.
	        var receivers = [window.parent, window];

	        for (var i = 0; i < receivers.length; i++) {
	          var receiver = receivers[i];

	          if (receiver) {
	            receiver.postMessage({
	              event: name,
	              data: data
	            }, '*');
	          }
	        }
	      }
	    }
	  }, {
	    key: "connectWidget",
	    value: function connectWidget() {
	      this.widgetConnected = true;
	    }
	  }, {
	    key: "disconnectWidget",
	    value: function disconnectWidget() {
	      this.widgetConnected = false;
	    }
	  }, {
	    key: "destroy",
	    value: function destroy() {
	      //Close the socket
	      if (this.socket) {
	        this.socket.close();
	        this.socket = null;
	      } //Clear the cache


	      if (this.cache) {
	        this.cache.destroy();
	        this.cache = null;
	      } //Destroy stats


	      if (this.playerStats) {
	        this.playerStats.destroy();
	        this.playerStats = null;
	      } //Destroy P2P


	      if (this.p2p) {
	        this.p2p.destroy();
	        this.p2p = null;
	      } //Destroy wallet


	      if (this.wallet) {
	        this.wallet.destroy();
	        this.wallet = null;
	      } //Clear config


	      this.config = null; //Remove event handlers

	      this.eventHandlers_ = null;
	    }
	  }]);

	  return Theta;
	}();

	return Theta;

})));
