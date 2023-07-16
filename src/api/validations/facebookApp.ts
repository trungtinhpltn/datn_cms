export const putFacebookAppPageByIdSchema = {
  body: {
    type: 'object',
    properties: {
      projectId: {
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

export const deleteFacebookAppPageByIdSchema = {
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

export const getFacebookAppPageByIdSchema = {
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

export const postFacebookAppsSchema = {
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

export const getFacebookAppByIdSchema = {
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

export const deleteFacebookAppByIdSchema = {
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
