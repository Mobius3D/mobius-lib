// © 2021 - 2021, ALL RIGHTS RESERVED
// Ed Estes, Daniel Newman, William J. Steele

'use strict';

const { expect } = require('chai');
const { utils } = require('..');

describe('Utils library', () => {
  describe('get', () => {
    const testObj = {
      foo: {
        bar: {
          wow: true,
          val: 'value'
        }
      },
      val: 10
    };

    it('should handle paths', (done) => {
      expect(utils.get(testObj, 'foo.bar.wow')).to.equal(testObj.foo.bar.wow);
      expect(utils.get(testObj, 'val')).to.equal(testObj.val);
      done();
    });

    it('should handle defaults', (done) => {
      expect(utils.get(testObj, 'val', -1)).to.equal(testObj.val);
      expect(utils.get(testObj, 'foo.val', -1)).to.equal(-1);
      done();
    });
  });

  describe('set', () => {
    const testObj = {
      foo: {
        bar1: {
          wow: true,
          val: 'value'
        }
      },
      val: 10
    };

    it('should handle paths', (done) => {
      utils.set(testObj, 'foo.bar.wow', false);
      expect(testObj.foo.bar.wow).to.equal(false);
      utils.set(testObj, 'val', 20);
      expect(testObj.val).to.equal(20);
      done();
    });

    it('should handle non-existent values', (done) => {
      utils.set(testObj, 'newValue', 1234);
      expect(testObj.newValue).to.equal(1234);
      done();
    });
  });

  it('merge should function as expected', (done) => {
    const a = {
      foo: {
        x: 'x-a',
        y: 'y-a'
      },
      val10: 'A'
    };
    const b = {
      foo: {
        bar: {
          val: 'val-b'
        },
        y: 'y-b'
      },
      val20: 'B'
    };
    const c = {
      foo: {
        bar: {
          another: 'another'
        }
      },
      val10: 'C',
      val20: undefined
    };
    const abc = {
      foo: {
        bar: {
          val: 'val-b',
          another: 'another'
        },
        x: 'x-a',
        y: 'y-b'
      },
      val10: 'C',
      val20: 'B'
    };

    const res = utils.merge({}, a, b, c);
    expect(res).to.deep.equal(abc);
    done();
  });

  it('pick should function as expected', (done) => {
    const obj = {
      a: 'a',
      b: 'b',
      c: 'c'
    };

    const res = utils.pick(obj, ['a', 'c']);
    delete obj.b;
    expect(res).to.deep.equal(obj);
    done();
  });

  it('isEmpty should function as expected', (done) => {
    expect(utils.isEmpty(null)).to.be.true;
    expect(utils.isEmpty(undefined)).to.be.true;
    expect(utils.isEmpty(true)).to.be.true;
    expect(utils.isEmpty(1)).to.be.true;
    expect(utils.isEmpty([])).to.be.true;
    expect(utils.isEmpty({})).to.be.true;
    expect(utils.isEmpty('')).to.be.true;
    expect(utils.isEmpty('hello')).to.be.false;
    expect(utils.isEmpty({ a: 1 })).to.be.false;
    expect(utils.isEmpty([1, 2, 3])).to.be.false;
    done();
  });

  it('isString should function as expected', (done) => {
    expect(utils.isString(null)).to.be.false;
    expect(utils.isString(undefined)).to.be.false;
    expect(utils.isString(true)).to.be.false;
    expect(utils.isString(1)).to.be.false;
    expect(utils.isString([])).to.be.false;
    expect(utils.isString({})).to.be.false;
    expect(utils.isString('')).to.be.true;
    expect(utils.isString('hello')).to.be.true;
    expect(utils.isString({ a: 'string' })).to.be.false;
    expect(utils.isString(['string'])).to.be.false;
    done();
  });
});
