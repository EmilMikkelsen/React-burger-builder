import reducer from './auth';
import * as actionsTypes from '../actions/actionTypes';

describe('auth reducer', () => {
    it('should return the initial state', () => {
        expect(reducer(undefined, {})).toEqual({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
    
    it('should store the token upon login', () => {
        expect(reducer({
            token: null,
            userId: null,
            error: null,
            loading: false,
            authRedirectPath: '/'
        }, {
            type: actionsTypes.AUTH_SUCCESS,
            idToken: 'a-idToken',
            userId: 'a-userId'
        })).toEqual({
            token: 'a-idoken',
            userId: 'a-userId',
            error: null,
            loading: false,
            authRedirectPath: '/'
        });
    });
});