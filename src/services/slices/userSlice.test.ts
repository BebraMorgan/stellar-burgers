import { mockUser } from './testConstants';
import userReducer, {
  fetchUser,
  updateUser,
  loginUser,
  registerUser,
  logoutUser,
  clearUserError,
  initialState
} from './userSlice';

describe('userSlice reducer and async actions', () => {
  it('should handle initial state', () => {
    expect(userReducer(undefined, { type: 'unknown' })).toEqual(initialState);
  });

  // fetchUser

  it('fetchUser.pending sets loading true and clears error', () => {
    const action = { type: fetchUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('fetchUser.fulfilled sets user, isAuthenticated true and loading false', () => {
    const action = { type: fetchUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('fetchUser.rejected sets error, isAuthenticated false and loading false', () => {
    const error = 'Failed to load user';
    const action = { type: fetchUser.rejected.type, payload: error };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.isAuthenticated).toBe(false);
  });

  // updateUser

  it('updateUser.pending sets loading true and clears error', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('updateUser.fulfilled updates user and sets loading false', () => {
    const action = { type: updateUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
  });

  it('updateUser.rejected sets error and loading false', () => {
    const error = 'Failed to update user';
    const action = { type: updateUser.rejected.type, payload: error };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  // loginUser

  it('loginUser.pending sets loading true and clears error', () => {
    const action = { type: loginUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('loginUser.fulfilled sets user, isAuthenticated true and loading false', () => {
    const action = { type: loginUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('loginUser.rejected sets error, isAuthenticated false and loading false', () => {
    const error = 'Login failed';
    const action = { type: loginUser.rejected.type, payload: error };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.isAuthenticated).toBe(false);
  });

  // registerUser

  it('registerUser.pending sets loading true and clears error', () => {
    const action = { type: registerUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('registerUser.fulfilled sets user, isAuthenticated true and loading false', () => {
    const action = { type: registerUser.fulfilled.type, payload: mockUser };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthenticated).toBe(true);
  });

  it('registerUser.rejected sets error, isAuthenticated false and loading false', () => {
    const error = 'Registration failed';
    const action = { type: registerUser.rejected.type, payload: error };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
    expect(state.isAuthenticated).toBe(false);
  });

  // logoutUser

  it('logoutUser.pending sets loading true and clears error', () => {
    const action = { type: logoutUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('logoutUser.fulfilled clears user, sets isAuthenticated false and loading false', () => {
    const loggedInState = {
      ...initialState,
      user: mockUser,
      isAuthenticated: true
    };
    const action = { type: logoutUser.fulfilled.type };
    const state = userReducer(loggedInState, action);
    expect(state.loading).toBe(false);
    expect(state.user).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });

  it('logoutUser.rejected sets error and loading false', () => {
    const error = 'Logout failed';
    const action = { type: logoutUser.rejected.type, payload: error };
    const state = userReducer(initialState, action);
    expect(state.loading).toBe(false);
    expect(state.error).toBe(error);
  });

  // clearUserError reducer

  it('clearUserError clears error', () => {
    const stateWithError = {
      ...initialState,
      error: 'Some error'
    };
    const state = userReducer(stateWithError, clearUserError());
    expect(state.error).toBeNull();
  });
});
