module.exports = {
  name: 'utils-testing',
  preset: '../../../jest.config.js',
  coverageDirectory: '../../../coverage/libs/utils/testing',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
