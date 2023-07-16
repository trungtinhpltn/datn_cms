export const putZaloAppPageByIdSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      }
    }
  },
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string'
      }
    }
  }
}

export const deleteZaloAppPageByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string'
      }
    }
  }
}

export const getZaloAppPageByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string'
      }
    }
  }
}

export const postZaloAppsSchema = {
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      key: {
        type: 'string'
      },
      secret: {
        type: 'string'
      }
    }
  }
}

export const getZaloAppByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string'
      }
    }
  }
}

export const deleteZaloAppByIdSchema = {
  params: {
    type: 'object',
    required: ['id'],
    properties: {
      id: {
        type: 'string'
      }
    }
  }
}
