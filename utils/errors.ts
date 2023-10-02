export class AppError extends Error {
  get name() {
    return this.constructor.name
  }
}

export function getErrorMessage(error: Error): string {
  if ((error as Error).message) {
    try {
      const err = JSON.parse((error as Error).message)
      if (err.error) {
        return err.error
      } else {
        return (error as Error).message
      }
    } catch (_) {
      return (error as Error).message
    }
  }

  return String(error)
}

export function handleError(error: Error) {
  if (error instanceof AppError) {
    return Response.json(
      {
        error: error.message
      },
      {
        status: 400
      }
    )
  }

  console.error(error)

  return Response.json(
    {
      error: 'unknown error'
    },
    {
      status: 500
    }
  )
}
