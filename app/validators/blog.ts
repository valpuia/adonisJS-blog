import vine from '@vinejs/vine'

export const createBlogValidator = vine.compile(
    vine.object({
        title: vine.string().trim().maxLength(255),
        excerpt: vine.string().trim().maxLength(255),
        content: vine.string().trim().minLength(20)
    })
)