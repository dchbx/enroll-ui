module.exports = {
  name: 'admin-brokers-feature',
  preset: '../../../../jest.config.js',
  coverageDirectory: '../../../../coverage/libs/admin/brokers/feature',
  snapshotSerializers: [
    'jest-preset-angular/build/AngularNoNgAttributesSnapshotSerializer.js',
    'jest-preset-angular/build/AngularSnapshotSerializer.js',
    'jest-preset-angular/build/HTMLCommentSerializer.js',
  ],
};
