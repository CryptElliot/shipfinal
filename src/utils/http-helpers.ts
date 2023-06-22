import axios from 'axios'

export async function getData<T>(url: string, token?: string): Promise<{
  data: T | null,
  error: unknown | null
}> {
  try {
    const response = await axios.get(url, {
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    })

    return {
      data: response?.data ?? null,
      error: null,
    }
  }
  catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export async function postData<T>(url: string, body: unknown, token?: string): Promise<{
  data: T | null,
  error: unknown | null,
}> {
  try {
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
        token,
      },
    })

    return {
      data: response?.data ?? null,
      error: null,
    }
  }
  catch (error) {
    return {
      data: null,
      error: error,
    }
  }
}

export async function deleteData(url: string, token?: string): Promise<{
  error: unknown | null
}> {
  try {
    await axios.delete(url, {
      headers: {
        token,
      }
    })

    return {
      error: null
    }
  }
  catch (error) {
    return {
      error: error
    }
  }
}
