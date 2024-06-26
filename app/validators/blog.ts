import vine from '@vinejs/vine'

export const blogValidator = vine.compile(
    vine.object({
        title: vine.string().trim().maxLength(255),
        excerpt: vine.string().trim().maxLength(255),
        content: vine.string().trim().minLength(20)
    })
)