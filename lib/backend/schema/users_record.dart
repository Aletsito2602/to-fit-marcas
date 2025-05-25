import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class UsersRecord extends FirestoreRecord {
  UsersRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "email" field.
  String? _email;
  String get email => _email ?? '';
  bool hasEmail() => _email != null;

  // "display_name" field.
  String? _displayName;
  String get displayName => _displayName ?? '';
  bool hasDisplayName() => _displayName != null;

  // "photo_url" field.
  String? _photoUrl;
  String get photoUrl => _photoUrl ?? '';
  bool hasPhotoUrl() => _photoUrl != null;

  // "uid" field.
  String? _uid;
  String get uid => _uid ?? '';
  bool hasUid() => _uid != null;

  // "created_time" field.
  DateTime? _createdTime;
  DateTime? get createdTime => _createdTime;
  bool hasCreatedTime() => _createdTime != null;

  // "phone_number" field.
  String? _phoneNumber;
  String get phoneNumber => _phoneNumber ?? '';
  bool hasPhoneNumber() => _phoneNumber != null;

  // "nombre_completo" field.
  String? _nombreCompleto;
  String get nombreCompleto => _nombreCompleto ?? '';
  bool hasNombreCompleto() => _nombreCompleto != null;

  // "seguidores" field.
  String? _seguidores;
  String get seguidores => _seguidores ?? '';
  bool hasSeguidores() => _seguidores != null;

  // "seguidos" field.
  String? _seguidos;
  String get seguidos => _seguidos ?? '';
  bool hasSeguidos() => _seguidos != null;

  // "alias" field.
  String? _alias;
  String get alias => _alias ?? '';
  bool hasAlias() => _alias != null;

  // "pin_code" field.
  double? _pinCode;
  double get pinCode => _pinCode ?? 0.0;
  bool hasPinCode() => _pinCode != null;

  // "id_tienda" field.
  String? _idTienda;
  String get idTienda => _idTienda ?? '';
  bool hasIdTienda() => _idTienda != null;

  // "ganancia_marca" field.
  String? _gananciaMarca;
  String get gananciaMarca => _gananciaMarca ?? '';
  bool hasGananciaMarca() => _gananciaMarca != null;

  void _initializeFields() {
    _email = snapshotData['email'] as String?;
    _displayName = snapshotData['display_name'] as String?;
    _photoUrl = snapshotData['photo_url'] as String?;
    _uid = snapshotData['uid'] as String?;
    _createdTime = snapshotData['created_time'] as DateTime?;
    _phoneNumber = snapshotData['phone_number'] as String?;
    _nombreCompleto = snapshotData['nombre_completo'] as String?;
    _seguidores = snapshotData['seguidores'] as String?;
    _seguidos = snapshotData['seguidos'] as String?;
    _alias = snapshotData['alias'] as String?;
    _pinCode = castToType<double>(snapshotData['pin_code']);
    _idTienda = snapshotData['id_tienda'] as String?;
    _gananciaMarca = snapshotData['ganancia_marca'] as String?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('users');

  static Stream<UsersRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => UsersRecord.fromSnapshot(s));

  static Future<UsersRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => UsersRecord.fromSnapshot(s));

  static UsersRecord fromSnapshot(DocumentSnapshot snapshot) => UsersRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static UsersRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      UsersRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'UsersRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is UsersRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createUsersRecordData({
  String? email,
  String? displayName,
  String? photoUrl,
  String? uid,
  DateTime? createdTime,
  String? phoneNumber,
  String? nombreCompleto,
  String? seguidores,
  String? seguidos,
  String? alias,
  double? pinCode,
  String? idTienda,
  String? gananciaMarca,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'email': email,
      'display_name': displayName,
      'photo_url': photoUrl,
      'uid': uid,
      'created_time': createdTime,
      'phone_number': phoneNumber,
      'nombre_completo': nombreCompleto,
      'seguidores': seguidores,
      'seguidos': seguidos,
      'alias': alias,
      'pin_code': pinCode,
      'id_tienda': idTienda,
      'ganancia_marca': gananciaMarca,
    }.withoutNulls,
  );

  return firestoreData;
}

class UsersRecordDocumentEquality implements Equality<UsersRecord> {
  const UsersRecordDocumentEquality();

  @override
  bool equals(UsersRecord? e1, UsersRecord? e2) {
    return e1?.email == e2?.email &&
        e1?.displayName == e2?.displayName &&
        e1?.photoUrl == e2?.photoUrl &&
        e1?.uid == e2?.uid &&
        e1?.createdTime == e2?.createdTime &&
        e1?.phoneNumber == e2?.phoneNumber &&
        e1?.nombreCompleto == e2?.nombreCompleto &&
        e1?.seguidores == e2?.seguidores &&
        e1?.seguidos == e2?.seguidos &&
        e1?.alias == e2?.alias &&
        e1?.pinCode == e2?.pinCode &&
        e1?.idTienda == e2?.idTienda &&
        e1?.gananciaMarca == e2?.gananciaMarca;
  }

  @override
  int hash(UsersRecord? e) => const ListEquality().hash([
        e?.email,
        e?.displayName,
        e?.photoUrl,
        e?.uid,
        e?.createdTime,
        e?.phoneNumber,
        e?.nombreCompleto,
        e?.seguidores,
        e?.seguidos,
        e?.alias,
        e?.pinCode,
        e?.idTienda,
        e?.gananciaMarca
      ]);

  @override
  bool isValidKey(Object? o) => o is UsersRecord;
}
