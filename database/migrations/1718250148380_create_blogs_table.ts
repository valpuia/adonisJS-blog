import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'blogs'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.string('title').notNullable()
      table.string('slug').notNullable().unique().index('blogs_slug')
      table.string('excerpt').nullable()
      table.string('image').nullable()
      table.text('content', 'longText').notNullable()
      table.integer('user_id')
        .unsigned()
        .references('users.id')
        .onDelete('cascade')
        .notNullable()
        .comment('creator')
      table.timestamp('created_at')
      table.timestamp('updated_at')
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}