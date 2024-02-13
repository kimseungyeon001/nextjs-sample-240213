if (typeof window === 'undefined') {
    const { server } = await import('./server')
    server.listen()
} else {
    console.log('browser mock is not')
}

export {}
