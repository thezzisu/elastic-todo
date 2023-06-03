export interface IMsftTodoTask {
  body: {
    content: string
    contentType: 'text' | 'html'
  }
  bodyLastModifiedDateTime: string
  categories: string[]
  completedDateTime: {
    dateTime: string
    timeZone: string
  }
  createdDateTime: string
  dueDateTime: {
    dateTime: string
    timeZone: string
  }
  hasAttachments: boolean
  id: string
  importance: 'low' | 'normal' | 'high'
  isReminderOn: boolean
  lastModifiedDateTime: string
  recurrence: unknown
  reminderDateTime: {
    dateTime: string
    timeZone: string
  }
  startDateTime: {
    dateTime: string
    timeZone: string
  }
  status: 'notStarted' | 'inProgress' | 'completed' | 'waitingOnOthers' | 'deferred'
  title: string
}
