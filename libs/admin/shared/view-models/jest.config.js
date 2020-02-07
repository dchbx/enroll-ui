module.exports = {
  name: 'admin-shared-view-models',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/admin/shared/view-models',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
