import 'dart:async';

import 'package:collection/collection.dart';

import '/backend/schema/util/firestore_util.dart';
import '/backend/schema/util/schema_util.dart';

import 'index.dart';
import '/flutter_flow/flutter_flow_util.dart';

class MarcasRecord extends FirestoreRecord {
  MarcasRecord._(
    DocumentReference reference,
    Map<String, dynamic> data,
  ) : super(reference, data) {
    _initializeFields();
  }

  // "nombre" field.
  String? _nombre;
  String get nombre => _nombre ?? '';
  bool hasNombre() => _nombre != null;

  // "logo" field.
  String? _logo;
  String get logo => _logo ?? '';
  bool hasLogo() => _logo != null;

  // "id_marca" field.
  String? _idMarca;
  String get idMarca => _idMarca ?? '';
  bool hasIdMarca() => _idMarca != null;

  // "seguidores" field.
  List<DocumentReference>? _seguidores;
  List<DocumentReference> get seguidores => _seguidores ?? const [];
  bool hasSeguidores() => _seguidores != null;

  // "alias_marca" field.
  String? _aliasMarca;
  String get aliasMarca => _aliasMarca ?? '';
  bool hasAliasMarca() => _aliasMarca != null;

  // "descripcion" field.
  String? _descripcion;
  String get descripcion => _descripcion ?? '';
  bool hasDescripcion() => _descripcion != null;

  // "seguidos" field.
  List<DocumentReference>? _seguidos;
  List<DocumentReference> get seguidos => _seguidos ?? const [];
  bool hasSeguidos() => _seguidos != null;

  // "banner_perfil" field.
  String? _bannerPerfil;
  String get bannerPerfil => _bannerPerfil ?? '';
  bool hasBannerPerfil() => _bannerPerfil != null;

  void _initializeFields() {
    _nombre = snapshotData['nombre'] as String?;
    _logo = snapshotData['logo'] as String?;
    _idMarca = snapshotData['id_marca'] as String?;
    _seguidores = getDataList(snapshotData['seguidores']);
    _aliasMarca = snapshotData['alias_marca'] as String?;
    _descripcion = snapshotData['descripcion'] as String?;
    _seguidos = getDataList(snapshotData['seguidos']);
    _bannerPerfil = snapshotData['banner_perfil'] as String?;
  }

  static CollectionReference get collection =>
      FirebaseFirestore.instance.collection('marcas');

  static Stream<MarcasRecord> getDocument(DocumentReference ref) =>
      ref.snapshots().map((s) => MarcasRecord.fromSnapshot(s));

  static Future<MarcasRecord> getDocumentOnce(DocumentReference ref) =>
      ref.get().then((s) => MarcasRecord.fromSnapshot(s));

  static MarcasRecord fromSnapshot(DocumentSnapshot snapshot) => MarcasRecord._(
        snapshot.reference,
        mapFromFirestore(snapshot.data() as Map<String, dynamic>),
      );

  static MarcasRecord getDocumentFromData(
    Map<String, dynamic> data,
    DocumentReference reference,
  ) =>
      MarcasRecord._(reference, mapFromFirestore(data));

  @override
  String toString() =>
      'MarcasRecord(reference: ${reference.path}, data: $snapshotData)';

  @override
  int get hashCode => reference.path.hashCode;

  @override
  bool operator ==(other) =>
      other is MarcasRecord &&
      reference.path.hashCode == other.reference.path.hashCode;
}

Map<String, dynamic> createMarcasRecordData({
  String? nombre,
  String? logo,
  String? idMarca,
  String? aliasMarca,
  String? descripcion,
  String? bannerPerfil,
}) {
  final firestoreData = mapToFirestore(
    <String, dynamic>{
      'nombre': nombre,
      'logo': logo,
      'id_marca': idMarca,
      'alias_marca': aliasMarca,
      'descripcion': descripcion,
      'banner_perfil': bannerPerfil,
    }.withoutNulls,
  );

  return firestoreData;
}

class MarcasRecordDocumentEquality implements Equality<MarcasRecord> {
  const MarcasRecordDocumentEquality();

  @override
  bool equals(MarcasRecord? e1, MarcasRecord? e2) {
    const listEquality = ListEquality();
    return e1?.nombre == e2?.nombre &&
        e1?.logo == e2?.logo &&
        e1?.idMarca == e2?.idMarca &&
        listEquality.equals(e1?.seguidores, e2?.seguidores) &&
        e1?.aliasMarca == e2?.aliasMarca &&
        e1?.descripcion == e2?.descripcion &&
        listEquality.equals(e1?.seguidos, e2?.seguidos) &&
        e1?.bannerPerfil == e2?.bannerPerfil;
  }

  @override
  int hash(MarcasRecord? e) => const ListEquality().hash([
        e?.nombre,
        e?.logo,
        e?.idMarca,
        e?.seguidores,
        e?.aliasMarca,
        e?.descripcion,
        e?.seguidos,
        e?.bannerPerfil
      ]);

  @override
  bool isValidKey(Object? o) => o is MarcasRecord;
}
