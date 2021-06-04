import { createAction } from '@reduxjs/toolkit'

export const apiCallBegan = createAction("api/callBegan")
export const apiCallSuccess = createAction("api/callSuccess")
export const apiCallFailed = createAction("api/callFailed")

export const authApiCallBegan = createAction("authApi/callBegan")
export const authApiCallSuccess = createAction("authApi/callSuccess")
export const authApiCallFailed = createAction("authApi/callFailed")