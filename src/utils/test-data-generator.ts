import { randomUUID } from 'crypto';

export class TestDataGenerator {
  static uniqueId(): string {
    return randomUUID().substring(0, 8);
  }

  static generateUser() {
    const id = this.uniqueId();
    return {
      username: `testuser_${id}`,
      email: `testuser_${id}@test.com`,
      password: 'Password123!',
    };
  }

  static generateArticle() {
    const id = this.uniqueId();
    return {
      title: `Test Article ${id}`,
      description: `Description for test article ${id}`,
      body: `This is the body content of test article ${id}. It contains multiple paragraphs.\n\nSecond paragraph with more details.`,
      tags: ['testing', 'automation'],
    };
  }

  static generateComment() {
    const id = this.uniqueId();
    return { body: `This is a test comment ${id}` };
  }

  static generateProfileUpdate() {
    const id = this.uniqueId();
    return {
      bio: `Updated bio ${id}`,
      image: `https://api.dicebear.com/7.x/avataaars/svg?seed=${id}`,
    };
  }
}
