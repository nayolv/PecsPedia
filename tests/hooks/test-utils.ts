import { act, renderHook, RenderHookResult } from '@testing-library/react-hooks'

export async function renderHookWithAct<TProps, TResult>(callback: (props: TProps) => TResult, props?: TProps): Promise<RenderHookResult<TProps, TResult>> {
    let rendered!: RenderHookResult<TProps, TResult>
    await act(async () => {
        rendered = renderHook(callback, { initialProps: props as any })
        // flush pending micro/macrotasks from useEffect
        await new Promise((resolve) => setImmediate(resolve))
        await new Promise((resolve) => setImmediate(resolve))
    })
    return rendered
}
