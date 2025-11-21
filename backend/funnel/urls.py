from rest_framework.routers import DefaultRouter

from . import views

router = DefaultRouter()
router.register(r"teams", views.SalesTeamViewSet, basename="team")
router.register(r"funnels", views.FunnelViewSet, basename="funnel")
router.register(r"stages", views.StageViewSet, basename="stage")
router.register(r"leads", views.LeadViewSet, basename="lead")

urlpatterns = router.urls
