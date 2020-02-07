module.exports = {
  name: 'design-system',
  preset: '../../jest.config.js',
  coverageDirectory: '../../coverage/apps/design-system',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
