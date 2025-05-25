import '/flutter_flow/flutter_flow_theme.dart';
import '/flutter_flow/flutter_flow_util.dart';
import 'dart:ui';
import 'package:flutter/material.dart';
import 'package:google_fonts/google_fonts.dart';
import 'terminos_y_condiciones_model.dart';
export 'terminos_y_condiciones_model.dart';

class TerminosYCondicionesWidget extends StatefulWidget {
  const TerminosYCondicionesWidget({super.key});

  @override
  State<TerminosYCondicionesWidget> createState() =>
      _TerminosYCondicionesWidgetState();
}

class _TerminosYCondicionesWidgetState
    extends State<TerminosYCondicionesWidget> {
  late TerminosYCondicionesModel _model;

  @override
  void setState(VoidCallback callback) {
    super.setState(callback);
    _model.onUpdate();
  }

  @override
  void initState() {
    super.initState();
    _model = createModel(context, () => TerminosYCondicionesModel());

    WidgetsBinding.instance.addPostFrameCallback((_) => safeSetState(() {}));
  }

  @override
  void dispose() {
    _model.maybeDispose();

    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Align(
      alignment: AlignmentDirectional(0.0, 1.0),
      child: Container(
        width: double.infinity,
        height: MediaQuery.sizeOf(context).height * 0.85,
        decoration: BoxDecoration(
          color: Color(0xA0000000),
          borderRadius: BorderRadius.only(
            bottomLeft: Radius.circular(0.0),
            bottomRight: Radius.circular(0.0),
            topLeft: Radius.circular(20.0),
            topRight: Radius.circular(20.0),
          ),
        ),
        child: ClipRRect(
          borderRadius: BorderRadius.circular(0.0),
          child: BackdropFilter(
            filter: ImageFilter.blur(
              sigmaX: 2.0,
              sigmaY: 2.0,
            ),
            child: Padding(
              padding: EdgeInsetsDirectional.fromSTEB(20.0, 0.0, 20.0, 0.0),
              child: SingleChildScrollView(
                child: Column(
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    SizedBox(
                      width: 100.0,
                      child: Divider(
                        height: 25.0,
                        thickness: 3.0,
                        color: FlutterFlowTheme.of(context).alternate,
                      ),
                    ),
                    Row(
                      mainAxisSize: MainAxisSize.max,
                      children: [
                        Expanded(
                          child: Text(
                            'Terminos Y Condiciones',
                            style: FlutterFlowTheme.of(context)
                                .bodyMedium
                                .override(
                                  font: GoogleFonts.manrope(
                                    fontWeight: FontWeight.w600,
                                    fontStyle: FlutterFlowTheme.of(context)
                                        .bodyMedium
                                        .fontStyle,
                                  ),
                                  fontSize: 30.0,
                                  letterSpacing: 0.0,
                                  fontWeight: FontWeight.w600,
                                  fontStyle: FlutterFlowTheme.of(context)
                                      .bodyMedium
                                      .fontStyle,
                                ),
                          ),
                        ),
                      ],
                    ),
                    Expanded(
                      child: Padding(
                        padding:
                            EdgeInsetsDirectional.fromSTEB(0.0, 15.0, 0.0, 0.0),
                        child: Row(
                          mainAxisSize: MainAxisSize.max,
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Expanded(
                              child: Padding(
                                padding: EdgeInsetsDirectional.fromSTEB(
                                    0.0, 0.0, 0.0, 15.0),
                                child: Text(
                                  'Bienvenido a To Fit, la aplicación líder en moda. \n\nAl acceder y utilizar nuestros servicios, aceptas cumplir con los siguientes términos:\n\nUso del Servicio:\n\nLa app se ofrece para que explores tendencias, compres productos y te mantengas al día con el mundo de la moda. Te comprometés a utilizarla de forma responsable y conforme a las leyes vigentes.\n\nRegistro y Seguridad:\n\nAl registrarte, proporcionás información veraz y actualizada. Eres responsable de mantener la confidencialidad de tus credenciales y de todas las actividades que se realicen con tu cuenta.\n\nPropiedad Intelectual:\n\nTodos los contenidos, imágenes, textos y gráficos de la app son propiedad de To Fit  o de sus respectivos titulares. Queda prohibida la reproducción o distribución sin autorización.\n\nLimitación de Responsabilidad:\n\nNos esforzamos por ofrecer información y servicios precisos, pero no garantizamos la total exactitud o disponibilidad en todo momento. No seremos responsables por daños directos o indirectos derivados del uso o la imposibilidad de uso de la app.\n\nModificaciones:\n\nNos reservamos el derecho de modificar estos términos en cualquier momento. Las actualizaciones serán publicadas en la app y se considerarán aceptadas si continuás utilizando nuestros servicios.\n\nResolución de Conflictos:\n\nCualquier disputa se resolverá de acuerdo con las leyes aplicables y, en su caso, mediante arbitraje o en los tribunales competentes.',
                                  style: FlutterFlowTheme.of(context)
                                      .bodyMedium
                                      .override(
                                        font: GoogleFonts.manrope(
                                          fontWeight:
                                              FlutterFlowTheme.of(context)
                                                  .bodyMedium
                                                  .fontWeight,
                                          fontStyle:
                                              FlutterFlowTheme.of(context)
                                                  .bodyMedium
                                                  .fontStyle,
                                        ),
                                        fontSize: 15.0,
                                        letterSpacing: 0.0,
                                        fontWeight: FlutterFlowTheme.of(context)
                                            .bodyMedium
                                            .fontWeight,
                                        fontStyle: FlutterFlowTheme.of(context)
                                            .bodyMedium
                                            .fontStyle,
                                      ),
                                ),
                              ),
                            ),
                          ],
                        ),
                      ),
                    ),
                  ],
                ),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
